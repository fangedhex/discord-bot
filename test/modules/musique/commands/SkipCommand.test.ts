import { mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { SkipCommand } from "../../../../src/modules/musique/commands/SkipCommand";
import { IUser } from "../../../../src/core/IUser";

test("should pause the audio", () => {
  const audio = mock<IAudio>();
  const sender = mock<IUser>({
    getAudio() {
      return audio;
    },
  });

  const skipCommand = new SkipCommand();
  skipCommand.run(sender);

  expect(audio.skip).toHaveBeenCalled();
  expect(sender.sendText).toHaveBeenCalledWith(
    `Passage au morceau suivant ...`
  );
});
