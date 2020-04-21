import { mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { IChat } from "../../../../src/core/IChat";
import { User } from "../../../../src/metadata/User";
import { PauseCommand } from "../../../../src/modules/musique/commands/PauseCommand";

test("should pause the audio", () => {
    const sender: User = {
        name: "test"
    };
    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const pauseCommand = new PauseCommand();
    pauseCommand.run({
        sender,
        command: "pause",
        args: [],
        chat,
        audio
    });

    expect(audio.pause).toHaveBeenCalled();
    expect(chat.send).toHaveBeenCalledWith(`Audio est maintenant en pause.`);
})
