import { Stack } from "../interfaces";

interface Node<T> {
    element: T;
    next?: Node<T>;
}

export class Fifo<T> implements Stack<T> {
    private _first: Node<T>;
    private _last: Node<T>;

    public push(element: T) {
        const node = { element };

        if (!this._first) {
            this._first = node;
            this._last = node
        } else {
            this._last.next = node;
            this._last = node;
        }
    }

    public pop(): T {
        if (!this._first)
            return null;

        const node = this._first;

        this._first = node.next;

        return node.element;
    }
}