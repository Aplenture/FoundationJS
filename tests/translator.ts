import { expect } from "chai";
import { Translator } from "../src/utils";

describe("Translator", () => {
    const translator = new Translator({ "hello": "world" });

    it("returns translation", () => expect(translator.translate("hello")).equals("world"));
    it("replaces values", () => expect(translator.translate("hello", { "w": "A" })).equals("Aorld"));
});