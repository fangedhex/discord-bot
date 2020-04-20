import { Container } from "inversify";
import { IMessageHandler, MessageHandler } from "./core/MessageHandler";
import { Discord } from "./bridge/Discord";
import { Module } from "./core/Module";
import { Musique } from "./modules/musique/MusiqueModule";

export const container = new Container();

container.bind<IMessageHandler>("MessageHandler").to(MessageHandler).inSingletonScope();
container.bind<Discord>("DiscordBridge").to(Discord).inSingletonScope();
container.bind<Module>("Modules").to(Musique).inSingletonScope();
