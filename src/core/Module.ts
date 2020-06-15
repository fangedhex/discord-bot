import { inject, injectable } from "inversify";
import { CommandManager } from "./CommandManager";

@injectable()
export abstract class Module {

    constructor(@inject(CommandManager) private commandManager: CommandManager) {
    }

    protected getCommandManager(): CommandManager {
        return this.commandManager;
    }

    /**
     * Called when enabling this module
     */
    abstract onEnable(): void;

    /**
     * Called when disabling this module
     */
    abstract onDisable(): void;
}
