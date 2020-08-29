import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { IUser } from "../../../core/IUser";

export class PauseCommand extends AbstractCommand {
  constructor() {
    super("pause", []);
  }

  run(sender: IUser): void {
    const audio = sender.getAudio();
    if (audio) {
      audio.pause();
      sender.sendText(`Audio est maintenant en pause.`);
    }
  }
}
