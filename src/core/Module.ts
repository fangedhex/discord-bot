import { CommandManager } from "./CommandManager";

export abstract class Module {
  constructor(private commandManager: CommandManager) {}

  protected getCommandManager(): CommandManager {
    return this.commandManager;
  }

  /**
   * Called when enabling this module
   */
  abstract onEnable(): void;
}
