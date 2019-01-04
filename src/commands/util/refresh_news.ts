import {CommandoClient, Command, CommandMessage} from "discord.js-commando";
import {doStuff} from "../..";

module.exports = class RefreshNews extends Command
{
    constructor(client: CommandoClient)
    {
        super(client, {
            name: "refresh-news",
            group: "util",
            memberName: "channel",
            description: "Refresh news",
            guildOnly: true
        });
    }

    // @ts-ignore
    public async run(msg: CommandMessage) {
        await msg.say("Refreshing news...");
        doStuff();
    }
};
