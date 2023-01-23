import { Event } from "./event";

export class Singleton<T> {
    public readonly onInstantiated = new Event<Singleton<T>, T>();

    private _instance: T;

    constructor(private readonly action: () => T) { }

    public get instance(): T {
        if (this._instance)
            return this._instance;

        this._instance = this.action();
        this.onInstantiated.emit(this, this._instance);

        return this._instance;
    }
}