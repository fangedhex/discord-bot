import { Command } from "../../../core/Command";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class SkipCommand extends Command {
    constructor() {
        super("skip");
    }

    run(payload: ICommandPayload): void {
        if (payload.audio) {
            payload.audio.skip();
            payload.chat.send(`Passage au morceau suivant ...`);
        }
    }
}
