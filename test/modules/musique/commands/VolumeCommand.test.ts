import { IAudio } from "../../../../src/core/IAudio";
import { IUser } from "../../../../src/core/IUser";
import { VolumeCommand } from "../../../../src/modules/musique/commands/VolumeCommand";
import { mock } from "jest-mock-extended";

test("should change the volume", () => {
  const sender = mock<IUser>();
  const audio = mock<IAudio>();

  sender.getAudio.mockReturnValueOnce(audio);

  const volumeCommand = new VolumeCommand();
  volumeCommand.run(sender, { volume: 0.5 });

  expect(sender.getAudio).toHaveBeenCalled();
  expect(audio.setVolume).toHaveBeenCalledWith(0.5);
  expect(sender.sendText).toHaveBeenCalledWith(`Volume mis à 0.5.`);
});
