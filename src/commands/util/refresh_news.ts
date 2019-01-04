import {CommandoClient, Command, CommandMessage} from "discord.js-commando";
import {doStuff} from "../..";

module.exports = class RefreshNews extends Command
{
    constructor(client: CommandoClient)
    {
        super(client, {
            name: "refresh-news",
            group: "util",
            memberName: "refresh-news",
            description: "Refresh news",
            guildOnly: true
        });
    }

    // @ts-ignore
    public run(msg: CommandMessage) {
        doStuff();
        return msg.reply("Refreshing news ...");
    }
};
