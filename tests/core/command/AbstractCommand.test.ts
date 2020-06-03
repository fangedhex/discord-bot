import { AbstractCommand } from "../../../src/core/command/AbstractCommand";
import { NumberType } from "../../../src/core/command/types/NumberType";
import { StringType } from "../../../src/core/command/types/StringType";
import { ICommandPayload } from "../../../src/core/ICommandPayload";
import { User } from "../../../src/metadata/User";

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

    run(payload: ICommandPayload): void {
    }
}

describe("AbstractCommand", () => {
    const command = new DummyTestCommand();

    it("name is correct", () => {
        expect(command.getName()).toBe("test");
    });

    it("description is correct", () => {
        expect(command.getDescription()).toBe(undefined);
        command.setDescription("dummy");
        expect(command.getDescription()).toBe("dummy");
    });

    it("validates the payload", () => {
        const errors = command.validate({
            sender: {
                name: "test"
            },
            command: "test",
            args: ["test", "8"],
            chat: {
                send(message: string, recipient?: User): void {
                }
            }
        });

        expect(errors).toHaveLength(0);
    });

    it("should NOT validate the payload", () => {
        const errors = command.validate({
            sender: {
                name: "test"
            },
            command: "test",
            args: ["test"],
            chat: {
                send(message: string, recipient?: User): void {
                }
            }
        });

        expect(errors).toHaveLength(1);
    });


    it("return the correct syntax", () => {
        const syntax = command.getSyntax();

        expect(syntax).toBe("$test <arg1> <arg2>");
    });
});
