import { Singleton } from "./singleton";
import { Command } from "./command";
import { Event } from "./event";
import { Stopwatch } from "./stopwatch";
import { formatDuration } from "../other";

export class Commander<TArgs, TRes> {
    public readonly onMessage = new Event<Commander<TArgs, TRes>, string>();

    private readonly _commands: NodeJS.Dict<Singleton<Command<TArgs, TRes>>> = {};

    public add(command: string, singleton: Singleton<Command<TArgs, TRes>>) {
        this._commands[command.toLowerCase()] = singleton;
    }

    public async execute<TArgs2 extends TArgs, TRes2 extends TRes>(command: string, args: TArgs2): Promise<TRes2> {
        const commandLine = `${command} ${Object.keys(args).map(key => `--${key} ${args[key]}`).join(' ')}`;
        const stopwatch = new Stopwatch();

        command = command.toLowerCase();

        this.onMessage.emit(this, "commander << " + commandLine);

        if (!this._commands[command])
            throw new Error(`Unknown command '${command}'. Type 'help' for help.`);

        const instance = this._commands[command].instance;

        try {
            stopwatch.start();
            const result = await instance.execute(args);
            stopwatch.stop();

            this.onMessage.emit(this, `commander >> ${commandLine} >> ${result} (${formatDuration(stopwatch.duration, { seconds: true, milliseconds: true })})`);

            return result as TRes2;
        } catch (error) {
            this.onMessage.emit(this, `commander >> ${commandLine} >> ${error.stack}`);

            throw error;
        }
    }

    public hasCommand<TArgs, TRes>(name: string): boolean {
        return !!this._commands[name.toLowerCase()];
    }
}