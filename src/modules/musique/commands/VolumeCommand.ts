import { Command } from "../../../core/Command";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class VolumeCommand extends Command {
    constructor() {
        super("setvol");
    }

    run(payload: ICommandPayload): void {
        if (payload.args.length < 1) {
            payload.chat.send("Veuillez donner une valeur de volume.");
            return;
        }

        if (payload.audio) {
            const newVolume: number = parseFloat(payload.args[0]);
            payload.audio.setVolume(newVolume);
            payload.chat.send(`Volume mis à ${newVolume}.`);
        }
    }
}
