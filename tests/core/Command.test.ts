import { Command } from "../../src/core/Command";

const command = new Command("test");

test("name is correct", () => {
    expect(command.getName()).toBe("test");
})

test("description is correct", () => {
    expect(command.getDescription()).toBe(undefined);
    command.setDescription("dummy");
    expect(command.getDescription()).toBe("dummy");
})
