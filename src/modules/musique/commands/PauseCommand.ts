import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class PauseCommand extends AbstractCommand {
    constructor() {
        super("pause", []);
    }

    run(payload: ICommandPayload): void {
        if (payload.audio) {
            payload.audio.pause();
            payload.chat.send(`Audio est maintenant en pause.`);
        }
    }
}
