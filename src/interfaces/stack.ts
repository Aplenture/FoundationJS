export interface Stack<T> {
    push(element: T);
    pop(): T;
}