import getenv = require("getenv");
const debug = require("debug")("discordbot");
import { CronJob } from "cron";
import { Message, RichEmbed, TextChannel } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import Commands from "./commands";
import { getLatestNews } from "./providers/newsapi";
import { IProvider } from "./providers/provider";
import { steamProvider } from "./providers/steam";

// Variables globales requises pour le bot
const DISCORD_API_KEY = getenv("DISCORD_API_KEY");
const DISCORD_CHANNEL_ID = "475991437822001162";

export default class DiscordBot {
  private readonly client: CommandoClient;
  private readonly providers: IProvider[];

  public constructor() {
    // Création du client Discord
    this.client = new CommandoClient({
      owner: "176651016660451328",
      commandPrefix: "$",
      disableEveryone: true,
    });

    this.client.on("ready", this.ready);
    this.client.on("commandRun", this.commandRun);

    // Création des apprisionneurs de nouvelles
    this.providers = [
      steamProvider("CSGO", 730),
      steamProvider("Space Engineers", 244850),
      steamProvider("No Man's Sky", 275850),
      steamProvider("Rocket League", 252950),
      steamProvider("Eco", 382310),
      getLatestNews(),
    ];
  }

  public run() {
    this.client.login(DISCORD_API_KEY);
  }

  public refreshNews() {
    // Finding the correct channel
    const channel = this.client.channels.find((c) => c.id === DISCORD_CHANNEL_ID) as TextChannel;

    // Removing all messages
    channel.fetchMessages(
      {
        limit: 100,
      }).then((messages) => {
      channel.bulkDelete(messages);
    });
    debug("Messages has been deleted from channel");

    this.providers.forEach((provider) => {
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

  private ready() {
    this.client.user.setActivity(`${this.client.commandPrefix}help`).then(() => {
      debug("Activity has been set !");
    });

    this.client.registry.registerDefaultTypes()
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
      this.refreshNews();
      const nextTime = cronJob.nextDates().toISOString().replace(/T/, " ").replace(/\..+/, "");
      debug("Waiting until " + nextTime + "(UTC)");
    }, undefined, true, "Europe/Paris");

    const next = cronJob.nextDates().toISOString().replace(/T/, " ").replace(/\..+/, "");
    debug("Waiting until " + next + "(UTC)");
  }

  private commandRun(command: Command, promise: Promise<Message>, msg: CommandMessage) {
    msg.delete();
  }
}
