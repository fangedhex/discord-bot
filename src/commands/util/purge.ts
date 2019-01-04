import {CommandoClient, Command, CommandMessage} from "discord.js-commando";
import {Collection, Message, TextChannel} from "discord.js";

module.exports = class Purge extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "purge",
            group: "util",
            memberName: "purge",
            description: "Remove all messages inside the bot channel",
            guildOnly: true
        });
    }

    // @ts-ignore
    public async run(msg: CommandMessage) {
        // Finding the correct channel
        let channel = msg.client.channels.find(c => c.id === "473967971908452382") as TextChannel;

        // Removing all messages
        channel.fetchMessages(
            {
                limit: 100
            })
            .then((messages: Collection<string, Message>) => {
                messages.forEach(async (message) => {
                    await message.delete(5);
                });
            });
    }
};
