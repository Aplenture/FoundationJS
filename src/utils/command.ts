export abstract class Command<TArgs, TRes> {
    public abstract execute(args: TArgs): Promise<TRes>;
}