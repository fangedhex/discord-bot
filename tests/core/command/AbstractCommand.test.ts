import { AbstractCommand } from "../../../src/core/command/AbstractCommand";
import { NumberType } from "../../../src/core/command/types/NumberType";
import { StringType } from "../../../src/core/command/types/StringType";
import { User } from "../../../src/metadata/User";

// @ts-ignore
const command = new AbstractCommand("test", [
    StringType,
    NumberType
]);

test("name is correct", () => {
    expect(command.getName()).toBe("test");
})

test("description is correct", () => {
    expect(command.getDescription()).toBe(undefined);
    command.setDescription("dummy");
    expect(command.getDescription()).toBe("dummy");
})

test("should NOT throw when validate", () => {
    expect(() => command.validate({
        sender: {
            name: "test"
        },
        command: "test",
        args: ["test", 8],
        chat: {
            send(message: string, recipient?: User): void {
            }
        }
    })).not.toThrow();
})

test("should throw", () => {
    expect(() => command.run({
        sender: {
            name: "test"
        },
        command: "test",
        args: [],
        chat: {
            send(message: string, recipient?: User): void {
            }
        }
    })).toThrow('command.run is not a function');
})
