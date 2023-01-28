import { Property } from "./property";

export abstract class Command<TConfig, TContext, TArgs extends NodeJS.ReadOnlyDict<any>, TRes> {
    public abstract readonly description: string;
    public abstract readonly property?: Property<TArgs>;

    constructor(
        public readonly config: TConfig,
        public readonly context: TContext
    ) { }

    public abstract execute(args: TArgs): Promise<TRes>;
}