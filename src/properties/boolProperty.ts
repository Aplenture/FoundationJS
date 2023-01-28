import { parseToBool } from "../other";
import { Property } from "../utils";

export class BoolProperty extends Property<boolean> {
    public parse(data: any): boolean {
        return data
            ? parseToBool(data)
            : false;
    }
}