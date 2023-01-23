export type EventHandler<TSender, TArgs> = (input: TArgs, sender: TSender) => void;

export class Event<TSender, TArgs> {
    private listeners: {
        readonly handler: EventHandler<TSender, TArgs>;
        readonly once: boolean;
        off?: boolean;
    }[] = [];

    constructor(...listeners: EventHandler<TSender, TArgs>[]) {
        listeners.forEach(listener => this.on(listener));
    }

    public get length(): number { return this.listeners.length; }

    public on(handler: EventHandler<TSender, TArgs>, once = false): void {
        if (this.listeners.find(listener => listener.handler == handler))
            return;

        this.listeners.push({ handler, once });
    }

    public off(handler: EventHandler<TSender, TArgs>): void {
        const listener = this.listeners.find(listener => listener.handler == handler);

        if (!listener)
            return;

        listener.off = true;
    }

    public once(handler: EventHandler<TSender, TArgs>): void {
        this.on(handler, true);
    }

    public emit(sender: TSender, args: TArgs): void {
        this.listeners.forEach(listener => !listener.off && listener.handler(args, sender));
        this.listeners = this.listeners.filter(listener => !listener.once && !listener.off);
    }

    public removeAllListeners() {
        this.listeners = [];
    }
}