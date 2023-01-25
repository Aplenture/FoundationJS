export class Translator {
    constructor(private readonly _dictionary: NodeJS.ReadOnlyDict<string>) { }

    public translate(key = '', values: NodeJS.ReadOnlyDict<string> = {}): string {
        if (!key)
            return '';

        let result = this._dictionary[key];

        if (!result) {
            console.warn(`Unknown translation for '${key}'.`);
            return key;
        }

        Object
            .keys(values)
            .forEach(key => result = result.replace(key, values[key]));

        return result;
    }
}