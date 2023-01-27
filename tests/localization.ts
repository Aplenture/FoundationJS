import { expect } from "chai";
import { Localization } from "../src/utils";

describe("Localization", () => {
    Localization.dictionary = { "hello": "world" };

    it("returns translation", () => expect(Localization.translate("hello")).equals("world"));
    it("replaces values", () => expect(Localization.translate("hello", { "w": "A" })).equals("Aorld"));
    
    it("emits missing translation", () => {
        let emittedKey = "";
        const callback = key => emittedKey = key;

        Localization.onMissingTranslation.on(callback);
        Localization.translate("test");

        expect(emittedKey).equals("test");
    });
    
    it("does not emit existing translation", () => {
        let emittedKey = "";
        const callback = key => emittedKey = key;

        Localization.onMissingTranslation.on(callback);
        Localization.translate("hello");

        expect(emittedKey).equals("");
    });
});