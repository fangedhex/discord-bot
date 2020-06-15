// Loading .env
require("dotenv").config();
import "@abraham/reflection";

import { Discord } from "./bridge/discord/Discord";
import { container } from "./ioc.config";
import { CommandManager } from "./core/CommandManager";

const discord = container.get<Discord>("DiscordBridge");
const messageHandler = container.get<CommandManager>("MessageHandler");

discord.login();
