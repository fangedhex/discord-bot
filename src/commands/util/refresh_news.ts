import {Command, CommandMessage, CommandoClient} from "discord.js-commando";
import {doStuff} from "../..";

export default class RefreshNews extends Command
{
    constructor(client: CommandoClient)
    {
        super(client, {
            name: "refresh-news",
            group: "util",
            memberName: "refresh-news",
            description: "Refresh news",
            guildOnly: true,
        });
    }

    public run(msg: CommandMessage) {
        doStuff();
        return msg.reply("Refreshing news ...");
    }
};
