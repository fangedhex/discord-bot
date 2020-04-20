import { mock } from "jest-mock-extended";
import { Command } from "../../src/core/Command";
import { IAudio } from "../../src/core/IAudio";
import { IChat } from "../../src/core/IChat";
import { ICommandPayload } from "../../src/core/ICommandPayload";
import { IModule, Module } from "../../src/core/Module";
import { User } from "../../src/metadata/User";

test("command", () => {
    // @ts-ignore
    const testModule: Module = new Module();

    const cmd = mock<Command>();
    testModule.registerCommand(cmd);
    cmd.getName.mockReturnValue("test");
    expect(testModule.hasCommand("test")).toBeTruthy();

    const user: User = {
        name: "test"
    };

    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const payload: ICommandPayload = {
        sender: user,
        command: "test",
        args: [],
        chat,
        audio
    }

    testModule.runCommand(payload);
    expect(cmd.run).toHaveBeenCalledWith(payload);

    const payload2: ICommandPayload = {
        sender: user,
        command: "test2",
        args: [],
        chat,
        audio
    }

    expect(() => testModule.runCommand(payload2)).toThrow("Unknown command test2.");
})
