import { mock } from 'jest-mock-extended';
import { IAudio } from "../../src/core/IAudio";
import { IChat } from "../../src/core/IChat";
import { ICommandPayload } from "../../src/core/ICommandPayload";
import { IMessagePayload } from "../../src/core/IMessagePayload";
import { MessageHandler } from "../../src/core/MessageHandler";
import { IModule } from "../../src/core/Module";
import { User } from "../../src/metadata/User";

test("should handle", () => {
    const mockedModule = mock<IModule>();
    mockedModule.hasCommand.calledWith("test").mockReturnValue(true);

    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const user: User = {
        name: "test"
    };

    const payload: IMessagePayload = {
        sender: user,
        message: "$test arg0",
        chat,
        audio
    };
    const commandPayload: ICommandPayload = {
        sender: user,
        command: "test",
        args: ["arg0"],
        chat,
        audio
    }

    const messageHandler = new MessageHandler([mockedModule]);
    messageHandler.parseMessage(payload);

    expect(mockedModule.hasCommand).toHaveBeenCalled();
    expect(mockedModule.runCommand).toHaveBeenCalled();
});
