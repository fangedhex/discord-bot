import { AbstractCommand } from "../../../src/core/command/AbstractCommand";
import { NumberType } from "../../../src/core/command/types/NumberType";
import { StringType } from "../../../src/core/command/types/StringType";
import { IUser } from "../../../src/core/IUser";

class DummyTestCommand extends AbstractCommand {
    constructor() {
        super("test", [
            {
                name: "arg1",
                Type: StringType
            },
            {
                name: "arg2",
                Type: NumberType
            }
        ]);
    }

    run(sender: IUser, args: {args1: string, arg2: number}): void {
    }
}

describe("AbstractCommand", () => {
    const command = new DummyTestCommand();

    it("name is correct", () => {
        expect(command.getName()).toBe("test");
    });

    it("return the correct syntax", () => {
        const syntax = command.getSyntax();

        expect(syntax).toBe("$test <arg1> <arg2>");
    });
});
