// Loading .env
require("dotenv").config();
import "@abraham/reflection";

import { Discord } from "./bridge/Discord";
import { container } from "./ioc.config";
import { MessageHandler } from "./core/MessageHandler";

const discord = container.get<Discord>("DiscordBridge");
const messageHandler = container.get<MessageHandler>("MessageHandler");

discord.login();
