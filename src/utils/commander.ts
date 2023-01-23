import { Singleton } from "./singleton";
import { Command } from "./command";
import { Event } from "./event";
import { Stopwatch } from "./stopwatch";
import { formatDuration } from "../other";

export class Commander {
    public static readonly onMessage = new Event<Commander, string>();

    private readonly _commands: NodeJS.Dict<Singleton<Command<any, any>>> = {};

    public add(command: string, singleton: Singleton<Command<any, any>>) {
        this._commands[command.toLowerCase()] = singleton;
    }

    public async execute<TArgs, TRes>(command: string, args: TArgs): Promise<TRes> {
        const commandLine = `${command} ${Object.keys(args).map(key => `--${key} ${args[key]}`).join(' ')}`;
        const stopwatch = new Stopwatch();

        command = command.toLowerCase();

        Commander.onMessage.emit(this, "commander << " + commandLine);

        if (!this._commands[command])
            throw new Error(`Unknown command '${command}'. Type 'help' for help.`);

        const instance = this._commands[command].instance;

        try {
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
}