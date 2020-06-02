import { AbstractCommand } from "../../../core/command/AbstractCommand";
import { NumberType } from "../../../core/command/types/NumberType";
import { ICommandPayload } from "../../../core/ICommandPayload";

export class VolumeCommand extends AbstractCommand {
    constructor() {
        super("setvol", [
            {
                name: "volume",
                Type: NumberType
            }
        ]);
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
