import {CommandoClient, Command, CommandMessage} from "discord.js-commando";
import {VoiceConnection} from "discord.js";

const youtubeStream = require("youtube-audio-stream");

module.exports = class Youtube extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: "yt",
            group: "util",
            memberName: "yt",
            description: "Play music through the bot",
            guildOnly: true,
            args: [
                {
                    key: 'url',
                    label: 'url',
                    prompt: 'Youtube url ?',
                    type: 'string'
                }
            ]
        });
    }

    // @ts-ignore
    public run(msg: CommandMessage, params: {url: string}) {
        let stream = youtubeStream(params.url);

        if(stream)
        {
            msg.member.voiceChannel.join().then((con: VoiceConnection) => {
                con.playStream(stream);
                stream.on("end", () => {
                    con.disconnect();
                })
            });
        }
    }
};
