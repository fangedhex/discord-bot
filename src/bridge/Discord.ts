const debug = require("debug")("bot:discord-bridge");

import { Client, Message, StreamDispatcher, VoiceChannel, VoiceConnection } from "discord.js";
import { inject, injectable } from "inversify";
import { Readable } from "stream";
import { IChat } from "../core/IChat";
import { DISCORD_API_KEY } from "../env.config";
import { IAudio } from "../core/IAudio";
import { IMessageHandler } from "../core/MessageHandler";
import { DiscordUser, User } from "../metadata/User";

@injectable()
export class Discord implements IAudio {
    private readonly client: Client;

    constructor(@inject("MessageHandler") private messageHandler: IMessageHandler) {
        this.client = new Client();

        this.client.once("ready", this.onReady.bind(this));
        this.client.on("message", this.onMessage.bind(this));
    }

    login() {
        this.client.login(DISCORD_API_KEY);
    }

    stream(user: DiscordUser, stream: Readable): void {
        const voiceChannel = this.client.channels.cache.find((c) => {
            if (c instanceof VoiceChannel) {
                return c.members.has(user.discord_id);
            }

            return false;
        });
        if (voiceChannel && voiceChannel instanceof VoiceChannel) {
            voiceChannel.join()
                .then((conn: VoiceConnection) => {
                    conn.play(stream);
                })
        }
    }

    private onReady() {
        if (this.client.user) {
            const status = process.env.NODE_ENV === "dev" ? "In dev mode" : "$help";
            this.client.user.setActivity(status).then(() => {
                debug("Activity has been set !");
            });
        }
    }

    private onMessage(message: Message) {
        if (message.author.bot) return;
        debug("Received message : " + message.content);

        const sender: DiscordUser = {
            name: message.author.username,
            discord_id: message.author.id
        }

        const chat: IChat = {
            send(reply: string, recipient?: User): void {
                message.reply(reply);
            }
        }

        this.messageHandler.parseMessage({
            sender,
            message: message.content,
            chat,
            audio: this
        });
    }
}
