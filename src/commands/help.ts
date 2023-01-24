import { StringProperty } from "../properties";
import { Command, Singleton } from "../utils";

interface Context {
    readonly commands: NodeJS.ReadOnlyDict<Singleton<Command<any, any, any>>>;
}

export class Help extends Command<Context, string, string> {
    public readonly description = "Lists all commands.";
    public readonly property = new StringProperty("command", "Type <command name> to get detailed help for specific command.");

    public async execute(filter: string): Promise<string> {
        const commands = Object.keys(this.context.commands)
            .filter(command => !filter || command.includes(filter))
            .sort((a, b) => a.localeCompare(b));

        const maxCommandNameLength = Math.max(...commands.map(command => command.length));

        let result = "";

        if (1 == commands.length) {
            const command = this.context.commands[commands[0]].instance;

            result += commands[0] + "\n";
            result += command.description + "\n";
            result += command.property.description;
        } else {
            result += commands
                .map(command => `${command}${' '.repeat(maxCommandNameLength - command.length)} - ${this.context.commands[command].instance.description}`)
                .join('\n');
        }

        return result;
    }
}