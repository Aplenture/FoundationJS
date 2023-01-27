import { expect } from "chai";
import { Singleton } from "../src/utils";

describe("Singleton", () => {
    it("instantiates", () => {
        const singleton = new Singleton(TestClass);

        expect(singleton.instance.constructor.name).equals("TestClass");
        expect(singleton.instance.get).is.a('function');
    });

    it("instantiates with arguments", () => {
        const singleton = new Singleton(TestClass, 1, 2, 3);

        expect(singleton.instance.get(0)).equals(1);
        expect(singleton.instance.get(1)).equals(2);
        expect(singleton.instance.get(2)).equals(3);
    });
});

class TestClass {
    private readonly values: any[];

    constructor(...values: any[]) {
        this.values = values;
    }

    public get(index: number) { return this.values[index]; }
}