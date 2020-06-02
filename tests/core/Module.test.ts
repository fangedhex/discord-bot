import { mock } from "jest-mock-extended";
import { AbstractCommand } from "../../src/core/command/AbstractCommand";
import { IAudio } from "../../src/core/IAudio";
import { IChat } from "../../src/core/IChat";
import { ICommandPayload } from "../../src/core/ICommandPayload";
import { IModule, Module } from "../../src/core/Module";
import { User } from "../../src/metadata/User";

class DummyTestModule extends Module {
    constructor() {
        super();
    }
}

describe("Module", () => {
    const module = new DummyTestModule();
    const cmd = mock<AbstractCommand>();

    const user: User = {
        name: "test"
    };

    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    it("should add our command", () => {
        module.registerCommand(cmd);
        cmd.getName.mockReturnValue("test");
        expect(module.hasCommand("test")).toBeTruthy();
    });

    it("execute known and valid command", () => {
        const payload: ICommandPayload = {
            sender: user,
            command: "test",
            args: [],
            chat,
            audio
        }

        // Calls mocking
        cmd.validate.calledWith(payload).mockReturnValue([]);

        module.runCommand(payload);

        // Calls expectation
        expect(cmd.validate).toHaveBeenCalledWith(payload);
        expect(cmd.run).toHaveBeenCalledWith(payload);
    });

    it("detect unknown command", () => {
        const payload2: ICommandPayload = {
            sender: user,
            command: "test2",
            args: [],
            chat,
            audio
        }

        module.runCommand(payload2);

        expect(chat.send).toHaveBeenCalledWith("Unknown command test2");
    });
});
