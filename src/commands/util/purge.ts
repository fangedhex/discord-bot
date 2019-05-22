import {Channel, Collection, Message, TextChannel} from "discord.js";
import {Command, CommandMessage, CommandoClient} from "discord.js-commando";

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
        const channel = msg.client.channels.find((c: Channel) => c.id === "473967971908452382") as TextChannel;

        // Removing all messages
        channel.fetchMessages(
            {
                limit: 100,
            })
            .then((messages: Collection<string, Message>) => {
                messages.forEach((message) => {
                    message.delete();
                });
            });

        return msg.reply("Nuking #bot channel !");
    }
};
