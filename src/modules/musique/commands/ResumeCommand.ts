import { Command } from "../../../core/Command";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class ResumeCommand extends Command {
    constructor() {
        super("resume");
    }

    run(payload: ICommandPayload): void {
        if (payload.audio) {
            payload.audio.resume();
            payload.chat.send(`Audio est maintenant en lecture.`);
        }
    }
}
