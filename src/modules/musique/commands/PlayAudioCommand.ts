import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { UrlType } from "../../../core/command/types/UrlType";
import ytdl = require('ytdl-core');
import { IUser } from "../../../core/IUser";

export class PlayAudioCommand extends AbstractCommand {
    constructor() {
        super("yt", [
            {
                name: "url",
                Type: UrlType
            }
        ]);
    }

    run(sender: IUser, args: {url: string}): void {
        const audio = sender.getAudio();
        if (audio) {
            audio.add(() => {
                return ytdl(args.url, { filter: 'audioonly' });
            });
            sender.sendText(`La vidéo youtube ${args.url} a été lancée.`);
        }
    }
}
