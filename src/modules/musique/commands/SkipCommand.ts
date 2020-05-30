import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class SkipCommand extends AbstractCommand {
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
