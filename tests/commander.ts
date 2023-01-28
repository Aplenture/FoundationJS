import { expect } from "chai";
import { Commander } from "../src/utils/commander";

describe.only("Commander", () => {
    const commander = new Commander();

    it("executes help", async () => expect(await commander.execute("help")).contains('help'));

    it("executes with arguments", async () => {
        expect(await commander.execute("help", { _: ['hel'] })).contains('help');
        expect(await commander.execute("help", { _: ['world'] })).contains('');
    });

    it("executes line", async () => {
        expect(await commander.executeLine("help")).contains('help');
        expect(await commander.executeLine("help hel")).contains('help');
        expect(await commander.executeLine("help world")).contains('');
    });
});