import { injectable } from "inversify";
import { Module } from "../../core/Module";
import { PauseCommand } from "./commands/PauseCommand";
import { PlayAudioCommand } from "./commands/PlayAudioCommand";
import { ResumeCommand } from "./commands/ResumeCommand";
import { VolumeCommand } from "./commands/VolumeCommand";

@injectable()
export class Musique extends Module {
    constructor() {
        super();

        this.registerCommand(new PlayAudioCommand());
        this.registerCommand(new VolumeCommand());
        this.registerCommand(new PauseCommand());
        this.registerCommand(new ResumeCommand());
    }
}
