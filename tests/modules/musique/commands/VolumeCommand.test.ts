import { mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { IChat } from "../../../../src/core/IChat";
import { User } from "../../../../src/metadata/User";
import { VolumeCommand } from "../../../../src/modules/musique/commands/VolumeCommand";

test("should change the volume", () => {
    const sender: User = {
        name: "test"
    };
    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const volumeCommand = new VolumeCommand();
    volumeCommand.run({
        sender,
        command: "pause",
        args: ["0.5"],
        chat,
        audio
    });

    expect(audio.setVolume).toHaveBeenCalledWith(0.5);
    expect(chat.send).toHaveBeenCalledWith(`Volume mis à 0.5.`);
});

test("should say the syntax", () => {
    const sender: User = {
        name: "test"
    };
    const chat = mock<IChat>();
    const audio = mock<IAudio>();

    const volumeCommand = new VolumeCommand();
    volumeCommand.run({
        sender,
        command: "setvol",
        args: [],
        chat,
        audio
    });

    expect(chat.send).toHaveBeenCalledWith("Veuillez donner une valeur de volume.");
});
