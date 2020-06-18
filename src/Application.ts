import { Discord } from "./bridge/discord/Discord";
import { EventBus } from "@fangedhex/eventbus";
import { CommandManager } from "./core/CommandManager";
import { CommandRunnerFactory } from "./factories/CommandRunnerFactory";
import { ModuleLoader } from "./core/ModuleLoader";
import { Musique } from "./modules/musique/MusiqueModule";

export class Application {
    private readonly eventBus: EventBus;
    private readonly discordBridge: Discord;
    private readonly commandManager: CommandManager;
    private readonly moduleLoader: ModuleLoader;

    constructor() {
        const commandRunnerFactory = new CommandRunnerFactory();

        this.eventBus = new EventBus();
        this.commandManager = new CommandManager(this.eventBus, commandRunnerFactory);
        this.discordBridge = new Discord(this.eventBus);
        this.moduleLoader = new ModuleLoader([
            new Musique(this.commandManager),
        ]);
    }

    run() {
        this.moduleLoader.enableAllModules();
        this.discordBridge.login();
    }
}
