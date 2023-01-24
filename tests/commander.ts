import { expect } from "chai";
import { Commander } from "../src/utils/commander";

describe("Commander", async () => {
    const commander = new Commander();

    describe("Help", () => {
        it("returns help", async () => expect(await commander.execute("help")).contains('help'));
    });
});