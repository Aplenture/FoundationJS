export type EventHandler<TSender, TArgs> = (input: TArgs, sender: TSender) => void;

export class Event<TSender, TArgs> {
    private listeners: {
        readonly handler: EventHandler<TSender, TArgs>;
        readonly sender: TSender;
        readonly once: boolean;
        off?: boolean;
    }[] = [];

    public get length(): number { return this.listeners.length; }

    public on(handler: EventHandler<TSender, TArgs>, sender?: TSender, once = false): void {
        if (this.listeners.find(listener => listener.handler == handler))
            return;

        this.listeners.push({ handler, sender, once });
    }

    public off(handler: EventHandler<TSender, TArgs>): void {
        const listener = this.listeners.find(listener => listener.handler == handler);

        if (!listener)
            return;

        listener.off = true;
    }

    public once(handler: EventHandler<TSender, TArgs>, sender?: TSender): void {
        this.on(handler, sender, true);
    }

    public emit(sender: TSender, args: TArgs): void {
        this.listeners.forEach(listener => !listener.off && (!listener.sender || sender == listener.sender) && listener.handler(args, sender));
        this.listeners = this.listeners.filter(listener => !listener.once && !listener.off);
    }

    public removeAllListeners() {
        this.listeners = [];
    }
}