import { Channel, Collection, Message, TextChannel } from "discord.js";
import { Command, CommandMessage, CommandoClient } from "discord.js-commando";

export default class Purge extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "purge",
      group: "util",
      memberName: "purge",
      description: "Remove all messages inside the bot channel",
      guildOnly: true,
    });
  }

  public run(msg: CommandMessage) {
    // Finding the correct channel
    const channel = msg.client.channels.find((c) => c.id === "473967971908452382");
    if (channel) {
      const textChannel = channel as TextChannel;
      // Removing all messages
      textChannel.fetchMessages({
        limit: 100,
      }).then((messages) => {
        messages.forEach((message) => {
          message.delete();
        });
      });
      return msg.reply("Nuking #bot channel !");
    } else {
      return msg.reply("Le canal #bot n'a pas pu être récupéré et nettoyé :(");
    }
  }
}
