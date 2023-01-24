import { parseToString } from "../other";
import { Property } from "../utils";

export class StringProperty extends Property<string> {
    public parse(data: any): string {
        return parseToString(data);
    }
}