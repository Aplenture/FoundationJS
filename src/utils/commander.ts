import { Singleton } from "./singleton";
import { Command } from "./command";
import { Event } from "./event";
import { Stopwatch } from "./stopwatch";
import { formatDuration } from "../other";
import { Help } from "../commands";

export const COMMAND_HELP = 'help';

export class Commander {
    public static readonly onMessage = new Event<Commander, string>();

    private readonly _commands: NodeJS.Dict<Singleton<Command<any, any, any>>> = {};

    constructor() {
        this.addCommand(COMMAND_HELP, Help, { commands: this._commands });
    }

    public get commands(): NodeJS.ReadOnlyDict<Singleton<Command<any, any, any>>> { return this._commands; }

    public addCommand<TContext, TArgs, TRes>(command: string, _constructor: new (...args: any[]) => Command<TContext, TArgs, TRes>, ...args: any[]) {
        this._commands[command.toLowerCase()] = new Singleton(_constructor, ...args);
    }

    public async execute<TArgs, TRes>(command: string, args?: TArgs): Promise<TRes> {
        const stopwatch = new Stopwatch();
        const commandLine = undefined === args
            ? command
            : `${command} ${Object.keys(args).map(key => `--${key} ${args[key]}`).join(' ')}`;

        command = command.toLowerCase();

        Commander.onMessage.emit(this, "commander << " + commandLine);

        if (!this._commands[command])
            throw new Error(`Unknown command '${command}'. Type '${COMMAND_HELP}' for help.`);

        const instance = this._commands[command].instance;

        try {
            if (instance.property && undefined !== args)
                args = instance.property.parse(args);

            stopwatch.start();
            const result = await instance.execute(args);
            stopwatch.stop();

            Commander.onMessage.emit(this, `commander >> ${commandLine} >> ${result} (${formatDuration(stopwatch.duration, { seconds: true, milliseconds: true })})`);

            return result as TRes;
        } catch (error) {
            Commander.onMessage.emit(this, `commander >> ${commandLine} >> ${error.stack}`);

            throw error;
        }
    }

    public hasCommand(name: string): boolean {
        return !!this._commands[name.toLowerCase()];
    }

    public getCommand<T extends Command<any, any, any>>(name: string): T {
        return this._commands[name.toLowerCase()].instance as T;
    }
}