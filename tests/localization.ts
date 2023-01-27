import { expect } from "chai";
import { Localization } from "../src/utils";

describe("Localization", () => {
    Localization.init({ "hello": "world" });

    it("returns translation", () => expect(Localization.translate("hello")).equals("world"));
    it("replaces values", () => expect(Localization.translate("hello", { "w": "A" })).equals("Aorld"));
});