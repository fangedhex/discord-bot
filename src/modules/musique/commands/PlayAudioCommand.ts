import { Command } from "../../../core/Command";
import { ICommandPayload } from "../../../core/ICommandPayload";
import ytdl = require('ytdl-core');

export class PlayAudioCommand extends Command {
    constructor() {
        super("yt");
    }

    run(payload: ICommandPayload): void {
        if (payload.args.length < 1) {
            payload.chat.send("Veuillez donner une URL.");
            return;
        }

        if (payload.audio) {
            payload.audio.stream(payload.sender, () => {
                return ytdl(payload.args[0], { filter: 'audioonly' });
            });
            payload.chat.send(`La vidéo youtube ${payload.args[0]} a été lancée.`);
        }
    }
}
