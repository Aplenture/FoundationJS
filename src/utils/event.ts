export type EventHandler<TSender, TArgs> = (input: TArgs, sender: TSender) => void;

interface Listener<TSender, TArgs> extends Options<TSender, TArgs> {
    readonly handler: EventHandler<TSender, TArgs>;
    off?: boolean;
}

interface Options<TSender, TArgs> {
    readonly sender?: TSender,
    readonly args?: TArgs,
    readonly once?: boolean
}

export class Event<TSender, TArgs> {
    private listeners: Listener<TSender, TArgs>[] = [];

    public get length(): number { return this.listeners.length; }

    public on(handler: EventHandler<TSender, TArgs>, options: Options<TSender, TArgs> = {}): void {
        if (this.listeners.find(listener => listener.handler == handler))
            return;

        this.listeners.push(Object.assign({ handler }, options));
    }

    public off(handler: EventHandler<TSender, TArgs>): void {
        const listener = this.listeners.find(listener => listener.handler == handler);

        if (!listener)
            return;

        listener.off = true;
    }

    public once(handler: EventHandler<TSender, TArgs>, sender?: TSender): void {
        this.on(handler, { sender, once: true });
    }

    public emit(sender: TSender, args: TArgs): void {
        this.listeners.forEach(listener => {
            if (listener.off)
                return;

            if (undefined != listener.sender && sender != listener.sender)
                return;

            if (undefined != listener.args && args != listener.args)
                return;

            listener.handler(args, sender);
        });

        this.listeners = this.listeners.filter(listener => !listener.once && !listener.off);
    }
}