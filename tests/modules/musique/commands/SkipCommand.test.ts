import { mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { IChat } from "../../../../src/core/IChat";
import { User } from "../../../../src/metadata/User";
import { SkipCommand } from "../../../../src/modules/musique/commands/SkipCommand";

test("should pause the audio", () => {
    const sender: User = {
        name: "test"
    };
    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const skipCommand = new SkipCommand();
    skipCommand.run({
        sender,
        command: "skip",
        args: [],
        chat,
        audio
    });

    expect(audio.skip).toHaveBeenCalled();
    expect(chat.send).toHaveBeenCalledWith(`Passage au morceau suivant ...`);
})
