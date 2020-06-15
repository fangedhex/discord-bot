import { Container } from "inversify";
import { CommandManager } from "./core/CommandManager";
import { Discord } from "./bridge/discord/Discord";
import { Module } from "./core/Module";
import { Musique } from "./modules/musique/MusiqueModule";
import { EventBus } from "@fangedhex/eventbus";

export const container = new Container();

// Injecting a singleton eventbus
container.bind(EventBus).to(EventBus).inSingletonScope();

container.bind(CommandManager).to(CommandManager).inSingletonScope();
container.bind<Discord>("DiscordBridge").to(Discord).inSingletonScope();
container.bind<Module>("Modules").to(Musique).inSingletonScope();
