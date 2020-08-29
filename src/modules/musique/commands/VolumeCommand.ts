import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { NumberType } from "../../../core/command/types/NumberType";
import { IUser } from "../../../core/IUser";

export class VolumeCommand extends AbstractCommand {
  constructor() {
    super("setvol", [
      {
        name: "volume",
        Type: NumberType,
      },
    ]);
  }

  run(sender: IUser, args: { volume: number }): void {
    const audio = sender.getAudio();
    if (audio) {
      audio.setVolume(args.volume);
      sender.sendText(`Volume mis à ${args.volume}.`);
    }
  }
}
