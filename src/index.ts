/*
* Discord BOT that show Steam news for games
*/

// Loading .env
import dotenv = require("dotenv");
dotenv.config();
import getenv = require("getenv");

const DISCORD_API_KEY = getenv("DISCORD_API_KEY");
const DISCORD_CHANNEL_ID = "475991437822001162";

import Debugger = require("debug");
const debug = Debugger("bot:kernel");

// Import the discord.js module
import { Emoji, Message, ReactionEmoji, RichEmbed, TextChannel } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
// Create an instance of a Discord client
const client = new CommandoClient({
    owner: "176651016660451328",
    commandPrefix: "$",
    disableEveryone: true,
});

import { IProvider } from "./providers/provider";

import { getLatestNews } from "./providers/newsapi";
import { steamProvider } from "./providers/steam";

const providers: IProvider[] = [
    steamProvider("CSGO", 730),
    steamProvider("Space Engineers", 244850),
    steamProvider("No Man's Sky", 275850),
    steamProvider("Rocket League", 252950),
    steamProvider("Eco", 382310),
    getLatestNews(),
];

export function doStuff() {
    // Finding the correct channel
    const channel = client.channels.find((c) => c.id === DISCORD_CHANNEL_ID) as TextChannel;

    // Removing all messages
    channel.fetchMessages(
        {
            limit: 100,
        }).then((messages) => {
        channel.bulkDelete(messages);
    });
    debug("Messages has been deleted from channel");

    providers.forEach((provider) => {
        provider().then((data) => {
            const msg = new RichEmbed();
            msg.setTitle(data.title);
            msg.setDescription(data.content);
            channel.send(msg);
            debug(`Sending RichEmbed ${data.title} to Discord`);
        })
            .catch((err) => {
                debug(err);
            });
    });
}

import {CronJob} from "cron";
import Commands from "./commands";

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
    client.user.setActivity(`${client.commandPrefix}help`).then(() => {
        debug("Activity has been set !");
    });

    client.registry.registerDefaultTypes()
        .registerDefaultGroups()
        .registerDefaultCommands({
            help: true,
            eval_: false,
            prefix: false,
            commandState: false,
            ping: false,
        })
        .registerCommands(Commands);

    const cronJob = new CronJob("0 0 8 * * *", () => {
        doStuff();
        const nextTime = cronJob.nextDates().toISOString().replace(/T/, " ").replace(/\..+/, "");
        debug("Waiting until " + nextTime + "(UTC)");
    }, null, true, "Europe/Paris");

    const next = cronJob.nextDates().toISOString().replace(/T/, " ").replace(/\..+/, "");
    debug("Waiting until " + next + "(UTC)");
});

client.on("commandRegister", (cmd: Command) => {
    debug("Registering command : " + cmd.name);
});

client.on("commandRun",  (command: Command, promise: Promise<Message>, msg: CommandMessage) => {
    msg.delete();
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(DISCORD_API_KEY);
