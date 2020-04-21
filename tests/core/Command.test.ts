import { Command } from "../../src/core/Command";
import { User } from "../../src/metadata/User";

const command = new Command("test");

test("name is correct", () => {
    expect(command.getName()).toBe("test");
})

test("description is correct", () => {
    expect(command.getDescription()).toBe(undefined);
    command.setDescription("dummy");
    expect(command.getDescription()).toBe("dummy");
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
    })).toThrow('This method is abstract');
})
