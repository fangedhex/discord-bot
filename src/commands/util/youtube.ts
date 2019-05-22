import { VoiceConnection } from "discord.js";
import {Command, CommandMessage, CommandoClient} from "discord.js-commando";
import youtubeStream = require("youtube-audio-stream");

export default class Youtube extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "yt",
            group: "util",
            memberName: "yt",
            description: "Play music through the bot",
            guildOnly: true,
            args: [
                {
                    key: "url",
                    label: "url",
                    prompt: "Youtube url ?",
                    type: "string",
                },
            ],
        });
    }

    public async run(msg: CommandMessage, params: {url: string}) {
        const stream = youtubeStream(params.url);

        if (stream)
        {
            msg.member.voiceChannel.join().then((con: VoiceConnection) => {
                con.playStream(stream);
                stream.on("end", () => {
                    con.disconnect();
                });
            });
        }

        return msg.reply(":o");
    }
}
