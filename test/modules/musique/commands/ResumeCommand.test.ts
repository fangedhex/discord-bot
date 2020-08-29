import { mock } from "jest-mock-extended";
import { IAudio } from "../../../../src/core/IAudio";
import { ResumeCommand } from "../../../../src/modules/musique/commands/ResumeCommand";
import { IUser } from "../../../../src/core/IUser";

test("should resume the audio", () => {
  const audio = mock<IAudio>();
  const sender = mock<IUser>({
    getAudio() {
      return audio;
    },
  });

  const resumeCommand = new ResumeCommand();
  resumeCommand.run(sender);

  expect(audio.resume).toHaveBeenCalled();
  expect(sender.sendText).toHaveBeenCalledWith(
    `Audio est maintenant en lecture.`
  );
});
