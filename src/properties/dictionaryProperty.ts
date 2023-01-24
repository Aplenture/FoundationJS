import { Property } from "../utils";

export class DictionaryProperty<T extends NodeJS.ReadOnlyDict<any>> extends Property<T> {
    public readonly properties: readonly Property<any>[];

    constructor(...properties: readonly Property<any>[]) {
        const maxNameLength = Math.max(...properties.map(property => property.name.length));

        super(null, properties.map(property => ' '.repeat(maxNameLength - property.name.length) + property.name + ' - ' + property.description).join("\n"));

        this.properties = properties;
    }

    public parse(data: any): T {
        const result = {};

        this.properties.forEach(property => result[property.name] = property.parse(data[property.name]));

        return result as any;
    }
}