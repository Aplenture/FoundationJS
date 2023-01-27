export abstract class Localization {
    private static dictionary: NodeJS.ReadOnlyDict<string>;

    public static init(dictionary: NodeJS.ReadOnlyDict<string>) {
        this.dictionary = dictionary;
    }

    public static translate(key = '', values: NodeJS.ReadOnlyDict<string> = {}): string {
        if (!key)
            return '';

        let result = this.dictionary[key];

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