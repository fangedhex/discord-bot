import { Musique } from "../../../src/modules/musique/MusiqueModule";
import { CommandManager } from "../../../src/core/CommandManager";
import { anyObject, mock } from "jest-mock-extended";
import { EventBus } from "@fangedhex/eventbus";
import { PlayAudioCommand } from "../../../src/modules/musique/commands/PlayAudioCommand";
import { VolumeCommand } from "../../../src/modules/musique/commands/VolumeCommand";
import { PauseCommand } from "../../../src/modules/musique/commands/PauseCommand";
import { ResumeCommand } from "../../../src/modules/musique/commands/ResumeCommand";
import { SkipCommand } from "../../../src/modules/musique/commands/SkipCommand";

describe(Musique, () => {
    it("registers commands", () => {
        const commandManager = mock<CommandManager>();
        const musique = new Musique(commandManager);

        musique.onEnable();

        expect(commandManager.registerCommand).toHaveBeenCalledWith(anyObject(PlayAudioCommand));
        expect(commandManager.registerCommand).toHaveBeenCalledWith(anyObject(VolumeCommand));
        expect(commandManager.registerCommand).toHaveBeenCalledWith(anyObject(PauseCommand));
        expect(commandManager.registerCommand).toHaveBeenCalledWith(anyObject(ResumeCommand));
        expect(commandManager.registerCommand).toHaveBeenCalledWith(anyObject(SkipCommand));
    })
});

