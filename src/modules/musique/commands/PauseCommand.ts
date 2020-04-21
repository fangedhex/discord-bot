import { Command } from "../../../core/Command";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class PauseCommand extends Command {
    constructor() {
        super("pause");
    }

    run(payload: ICommandPayload): void {
        if (payload.audio) {
            payload.audio.pause();
            payload.chat.send(`Audio est maintenant en pause.`);
        }
    }
}
