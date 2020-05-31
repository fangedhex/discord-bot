import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class ResumeCommand extends AbstractCommand {
    constructor() {
        super("resume", []);
    }

    run(payload: ICommandPayload): void {
        if (payload.audio) {
            payload.audio.resume();
            payload.chat.send(`Audio est maintenant en lecture.`);
        }
    }
}
