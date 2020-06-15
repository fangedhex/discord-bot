import { EventBus } from "@fangedhex/eventbus";
import {
    Client,
    DMChannel,
    Message as DiscordMessage,
    Presence as DiscordPresence,
    StreamDispatcher,
    TextChannel,
    VoiceChannel,
    VoiceConnection
} from "discord.js";
import { inject, injectable } from "inversify";
import { DISCORD_API_KEY } from "../../env.config";
import { IAudio, OnDemandStream } from "../../core/IAudio";
import { MessageEvent } from "../../core/events/MessageEvent";
import { User } from "./User";
import { Message } from "./Message";
import { UserPresenceUpdateEvent } from "../../core/events/UserPresenceUpdateEvent";

const debug = require("debug")("bot:discord-bridge");
const COMMAND_PREFIX = "$";

@injectable()
export class Discord implements IAudio {
    private readonly client: Client;

    constructor(@inject(EventBus) private eventBus: EventBus) {
        this.client = new Client();

        this.client.on("ready", this.onReady.bind(this));
        this.client.on("message", this.onMessage.bind(this));
        this.client.on("presenceUpdate", this.onPresenceUpdate.bind(this));
    }

    login() {
        this.client.login(DISCORD_API_KEY);
    }

    /*
        AUDIO PART
     */

    private voiceConnection?: VoiceConnection;
    private audioDispatcher?: StreamDispatcher;
    private previousVolume: number = 1;
    private playlist: OnDemandStream[] = [];

    private async joinChannelOf(user: any) {
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

    add(stream: OnDemandStream) {
    }

    stream(user: any, stream: OnDemandStream): void {
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
            this.client.user.setActivity(COMMAND_PREFIX + "help")
                .then(() => {
                    debug("Activity has been set !");
                });
        }
    }

    /*
        TEXT PART
     */

    private onMessage(discordMessage: DiscordMessage) {
        if (discordMessage.author.bot) return;

        if (discordMessage.channel instanceof TextChannel) {
            debug("Received message from %s on %s : %s", discordMessage.author.username, discordMessage.channel.name, discordMessage.content);
        } else if (discordMessage.channel instanceof DMChannel) {
            debug("Received private message from %s : %s", discordMessage.author.username, discordMessage.content);
        }

        const user = new User(discordMessage.author, this);
        const message = new Message(discordMessage);

        // TODO Factory ?
        this.eventBus.dispatch(new MessageEvent(user, message));
    }

    private onPresenceUpdate(oldPresence: DiscordPresence | undefined, newPresence: DiscordPresence) {
        if (!newPresence.user) return;

        // TODO Factory ?
        const user = new User(newPresence.user, this);
        this.eventBus.dispatch(new UserPresenceUpdateEvent(user, newPresence, oldPresence));
    }
}
