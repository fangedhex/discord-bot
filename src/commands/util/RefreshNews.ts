import { Command, CommandMessage, CommandoClient } from "discord.js-commando";
import DiscordBot from "../../DiscordBot";

export default class RefreshNews extends Command {
  private bot?: DiscordBot;

  constructor(client: CommandoClient) {
    super(client, {
      name: "refresh-news",
      group: "util",
      memberName: "refresh-news",
      description: "Refresh news",
      guildOnly: true,
    });
  }

  public run(msg: CommandMessage) {
    if (this.bot) {
      this.bot.refreshNews();
      return msg.reply("Rafraichissement des infos ...");
    } else {
      return msg.reply("Le rafraichissement des infos n'a pas fonctionné comme prévu :(");
    }
  }
}
