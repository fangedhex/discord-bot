import { injectable } from "inversify";
import { Module } from "../../core/Module";
import { PlayAudioCommand } from "./commands/PlayAudioCommand";

@injectable()
export class Musique extends Module {
    constructor() {
        super();

        this.registerCommand(new PlayAudioCommand());
    }
}
