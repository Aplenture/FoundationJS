import { Stack } from "../interfaces";

export class Lifo<T> implements Stack<T> {
    private readonly elements: T[] = [];

    public push(element: T) {
        this.elements.push(element);
    }

    public pop(): T {
        return this.elements.pop();
    }
}