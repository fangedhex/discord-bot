import { mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { PauseCommand } from "../../../../src/modules/musique/commands/PauseCommand";
import { IUser } from "../../../../src/core/IUser";

describe(PauseCommand, () => {
  it("should pause the audio", () => {
    const audio = mock<IAudio>();
    const sender = mock<IUser>({
      getAudio() {
        return audio;
      },
    });

    const pauseCommand = new PauseCommand();
    pauseCommand.run(sender);

    expect(audio.pause).toHaveBeenCalled();
    expect(sender.sendText).toHaveBeenCalledWith(
      `Audio est maintenant en pause.`
    );
  });
});
