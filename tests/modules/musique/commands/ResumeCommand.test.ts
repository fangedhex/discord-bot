import { mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { IChat } from "../../../../src/core/IChat";
import { User } from "../../../../src/metadata/User";
import { ResumeCommand } from "../../../../src/modules/musique/commands/ResumeCommand";

test("should resume the audio", () => {
    const sender: User = {
        name: "test"
    };
    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const resumeCommand = new ResumeCommand();
    resumeCommand.run({
        sender,
        command: "resume",
        args: [],
        chat,
        audio
    });

    expect(audio.resume).toHaveBeenCalled();
    expect(chat.send).toHaveBeenCalledWith(`Audio est maintenant en lecture.`);
})
