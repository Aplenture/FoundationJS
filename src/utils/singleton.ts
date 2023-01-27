export class Singleton<T> {
    private readonly args: any[];

    private _instance: T;

    constructor(private readonly _constructor: new (...args: any[]) => T, ...args: any[]) {
        this.args = args;
    }

    public get instance(): T { return this._instance || (this._instance = new this._constructor(...this.args)); }
}