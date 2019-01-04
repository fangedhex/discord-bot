/*
* Discord BOT that show Steam news for games
*/

// Loading .env
require('dotenv').config();
import getenv = require("getenv");

const DISCORD_API_KEY = getenv("DISCORD_API_KEY");
const DISCORD_CHANNEL_ID = "475991437822001162";

const debug = require("debug")("bot:kernel");

// Import the discord.js module
import { CommandoClient } from 'discord.js-commando'
import { RichEmbed, TextChannel } from 'discord.js'
// Create an instance of a Discord client
const client = new CommandoClient({
	owner: "176651016660451328"
});

// Commands loader
client.commandPrefix = "!";
client.registry.registerDefaults();

import { Provider } from "./providers/provider"

import { steamProvider } from "./providers/steam"
import { getLatestNews } from "./providers/newsapi"
const providers: Array<Provider> = [
	steamProvider("CSGO", 730),
	steamProvider("Space Engineers", 244850),
	steamProvider("No Man's Sky", 275850),
	steamProvider("Rocket League", 252950),
	steamProvider("Eco", 382310),
	getLatestNews()
]

function doStuff()
{
	// Finding the correct channel
	let channel = client.channels.find(c => c.id === DISCORD_CHANNEL_ID) as TextChannel;

	// Removing all messages
	channel.fetchMessages(
	{
		limit: 100
	}).then((messages) =>
	{
		channel.bulkDelete(messages);
	});
	debug("Messages has been deleted from channel");

	providers.forEach((provider) => {
		provider().then((data) => {
			let msg = new RichEmbed;
			msg.setTitle(data.title);
			msg.setDescription(data.content);
			channel.send(msg);
			debug(`Sending RichEmbed ${data.title} to Discord`);
		})
		.catch((err) => {
			debug(err);
		})
	})
}

import { CronJob } from "cron"

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () =>
{
	client.user.setActivity("!help").then(() => {
		debug("Activity has been set !");
	});

	let cronJob = new CronJob("0 0 8 * * *", () => {
		doStuff();
		let next = cronJob.nextDates().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		debug("Waiting until " + next + "(UTC)");
	}, null, true, "Europe/Paris");

	let next = cronJob.nextDates().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	debug("Waiting until " + next + "(UTC)");
});

client.on('message', (message) => {
	if(message.content === "$reload_news") {
		message.delete();
		doStuff();
	}
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(DISCORD_API_KEY);
