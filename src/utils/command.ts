export abstract class Command<TContext, TArgs, TRes> {
    constructor(public readonly context: TContext) {
    }

    public abstract execute(args: TArgs): Promise<TRes>;
}