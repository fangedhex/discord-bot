import { anyFunction, mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { IChat } from "../../../../src/core/IChat";
import { User } from "../../../../src/metadata/User";
import { PlayAudioCommand } from "../../../../src/modules/musique/commands/PlayAudioCommand";

test("should stream", () => {
    const user: User = {
        name: "test"
    };
    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const playAudioCommand = new PlayAudioCommand();
    expect(playAudioCommand.getName()).toBe("yt");
    playAudioCommand.run({
        sender: user,
        command: "yt",
        args: ["https://www.youtube.com/watch?v=-knI8FdkT4s"],
        chat,
        audio
    });

    expect(audio.stream).toHaveBeenCalledWith(user, anyFunction());
})

test("should say the syntax", () => {
    const user: User = {
        name: "test"
    };
    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const playAudioCommand = new PlayAudioCommand();
    expect(playAudioCommand.getName()).toBe("yt");
    playAudioCommand.run({
        sender: user,
        command: "yt",
        args: [],
        chat,
        audio
    });

    expect(chat.send).toHaveBeenCalledWith("Veuillez donner une URL.");
})

