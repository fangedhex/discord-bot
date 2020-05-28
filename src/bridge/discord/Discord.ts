const debug = require("debug")("bot:discord-bridge");

import { Client, Message, StreamDispatcher, VoiceChannel, VoiceConnection } from "discord.js";
import { inject, injectable } from "inversify";
import { IChat } from "../../core/IChat";
import { DISCORD_API_KEY } from "../../env.config";
import { IAudio, OnDemandStream } from "../../core/IAudio";
import { IMessageHandler } from "../../core/MessageHandler";
import { DiscordUser, User } from "../../metadata/User";

@injectable()
export class Discord implements IAudio {
    private readonly client: Client;

    constructor(@inject("MessageHandler") private messageHandler: IMessageHandler) {
        this.client = new Client();

        this.client.on("ready", this.onReady.bind(this));
        this.client.on("message", this.onMessage.bind(this));
    }

    login() {
        this.client.login(DISCORD_API_KEY);
    }

    private voiceConnection?: VoiceConnection;
    private audioDispatcher?: StreamDispatcher;
    private previousVolume: number = 1;
    private playlist: OnDemandStream[] = [];

    private async joinChannelOf(user: DiscordUser) {
        // Si on a déjà une connexion, on exécute pas le reste de la fonction
        if (this.voiceConnection) return;

        const voiceChannel = this.client.channels.cache.find((c) => {
            if (c instanceof VoiceChannel) {
                return c.members.has(user.discord_id);
            }

            return false;
        });
        if (voiceChannel && voiceChannel instanceof VoiceChannel) {
            this.voiceConnection = await voiceChannel.join();
                /*.then((conn: VoiceConnection) => {
                    this.audioDispatcher = conn.play(stream, {
                        volume: this.previousVolume
                    });
                });*/
        }
    }

    private playNextTrack() {
        // Si on est déjà en train de lire un son, on arrête là
        if (this.audioDispatcher) return;

        const streamOnDemand = this.playlist.shift();
        if (streamOnDemand) {
            const stream = streamOnDemand();
            this.audioDispatcher = this.voiceConnection?.play(stream, {
                volume: this.previousVolume
            });
            this.audioDispatcher?.on("finish", () => {
                debug("Audio stream ended - playing next track if any");
                this.audioDispatcher = undefined;
                this.playNextTrack();
            })
        } else {
            this.voiceConnection?.channel.leave();
        }
    }

    stream(user: DiscordUser, stream: OnDemandStream): void {
        this.playlist.push(stream);

        this.joinChannelOf(user)
            .then(this.playNextTrack.bind(this));
    }

    pause(): void {
        debug("Pausing audio.");
        this.audioDispatcher?.pause();
    }

    resume(): void {
        debug("Resuming audio.");
        this.audioDispatcher?.resume();
    }

    setVolume(volume: number): void {
        debug(`Setting volume to ${volume}.`);
        this.previousVolume = volume;
        this.audioDispatcher?.setVolume(volume);
    }

    skip() {
        this.audioDispatcher?.end();
    }

    private onReady() {
        if (this.client.user) {
            const status = process.env.NODE_ENV === "dev" ? "In dev mode" : "$help";
            this.client.user.setActivity(status, {type: "CUSTOM_STATUS"})
                .then(() => {
                    debug("Activity has been set !");
                });
        }
    }

    private onMessage(message: Message) {
        if (message.author.bot) {
            return;
        }
        debug("Received message : " + message.content);

        const sender: DiscordUser = {
            name: message.author.username,
            discord_id: message.author.id
        };

        const chat: IChat = {
            send(reply: string, recipient?: User): void {
                message.reply(reply);
            }
        };

        this.messageHandler.parseMessage({
            sender,
            message: message.content,
            chat,
            audio: this
        });
    }
}
