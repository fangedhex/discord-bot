import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { IUser } from "../../../core/IUser";

export class ResumeCommand extends AbstractCommand {
    constructor() {
        super("resume", []);
    }

    run(sender: IUser): void {
        const audio = sender.getAudio();
        if (audio) {
            audio.resume();
            sender.sendText(`Audio est maintenant en lecture.`);
        }
    }
}
