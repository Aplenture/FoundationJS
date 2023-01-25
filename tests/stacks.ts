import { expect } from "chai";
import * as Stacks from "../src/stacks";

describe("Stacks", () => {
    describe("Fifo", () => {
        const stack = new Stacks.Fifo<any>();
        const elements = [1, "2", 3.0, { "hello": "world" }];

        elements.forEach(element => stack.push(element));

        it("returns correct series", () => elements.forEach(element => expect(stack.pop()).equals(element)));
    });

    describe("Lifo", () => {
        const stack = new Stacks.Lifo<any>();
        const elements = [1, "2", 3.0, { "hello": "world" }];

        elements.forEach(element => stack.push(element));

        it("returns correct series", () => elements.reverse().forEach(element => expect(stack.pop()).equals(element)));
    });
});