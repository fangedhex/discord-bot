import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { IUser } from "../../../core/IUser";

export class SkipCommand extends AbstractCommand {
    constructor() {
        super("skip", []);
    }

    run(sender: IUser): void {
        const audio = sender.getAudio();
        if (audio) {
            audio.skip();
            sender.sendText(`Passage au morceau suivant ...`);
        }
    }
}
