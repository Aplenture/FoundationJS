import { Property } from "./property";

export abstract class Command<TContext, TArgs, TRes> {
    public abstract readonly description: string;
    public abstract readonly property?: Property<TArgs>;

    constructor(public readonly context: TContext) { }

    public abstract execute(args: TArgs): Promise<TRes>;
}