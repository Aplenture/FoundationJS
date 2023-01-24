import { parseToNumber } from "../other";
import { Property } from "../utils";

export class NumberProperty extends Property<number> {
    public parse(data: any): number {
        return parseToNumber(data);
    }
}