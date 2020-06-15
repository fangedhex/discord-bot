import { injectable } from "inversify";
import { Module } from "../../core/Module";
import { PauseCommand } from "./commands/PauseCommand";
import { PlayAudioCommand } from "./commands/PlayAudioCommand";
import { ResumeCommand } from "./commands/ResumeCommand";
import { SkipCommand } from "./commands/SkipCommand";
import { VolumeCommand } from "./commands/VolumeCommand";

@injectable()
export class Musique extends Module {
    onEnable() {
        this.getCommandManager().registerCommand(new PlayAudioCommand());
        this.getCommandManager().registerCommand(new VolumeCommand());
        this.getCommandManager().registerCommand(new PauseCommand());
        this.getCommandManager().registerCommand(new ResumeCommand());
        this.getCommandManager().registerCommand(new SkipCommand());
    }

    onDisable() {
    }
}
