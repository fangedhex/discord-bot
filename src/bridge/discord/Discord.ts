import { EventBus } from "@fangedhex/eventbus";
import {
    Client,
    DMChannel,
    Message as DiscordMessage,
    Presence as DiscordPresence,
    TextChannel,
    User as DiscordUser, VoiceChannel
} from "discord.js";
import { DISCORD_API_KEY } from "../../env.config";
import { MessageEvent } from "../../core/events/MessageEvent";
import { User } from "./User";
import { Message } from "./Message";
import { UserPresenceUpdateEvent } from "../../core/events/UserPresenceUpdateEvent";
import { Audio } from "./Audio";

const debug = require("debug")("bot:discord-bridge");
const COMMAND_PREFIX = "$";

export class Discord {
    private readonly client: Client;
    private audio?: Audio;

    constructor(private eventBus: EventBus) {
        this.client = new Client();

        this.client.on("ready", this.onReady.bind(this));
        this.client.on("message", this.onMessage.bind(this));
        this.client.on("presenceUpdate", this.onPresenceUpdate.bind(this));
    }

    login() {
        this.client.login(DISCORD_API_KEY);
    }

    private onReady() {
        if (this.client.user) {
            this.client.user.setActivity(COMMAND_PREFIX + "help")
                .then(() => {
                    debug("Activity has been set !");
                });
        }
    }

    private async getAudio(user: DiscordUser) {
        if (!this.audio) {
            const voiceChannel = this.client.channels.cache.find((c) => {
                if (c instanceof VoiceChannel) {
                    return c.members.has(user.id);
                }

                return false;
            });
            if (voiceChannel && voiceChannel instanceof VoiceChannel) {
                const conn = await voiceChannel.join();

                // TODO Factory ?
                this.audio = new Audio(this, conn);
            }
        }

        return this.audio;
    }

    finishAudio() {
        this.audio = undefined;
    }

    private onMessage(discordMessage: DiscordMessage) {
        if (discordMessage.author.bot) return;

        if (discordMessage.channel instanceof TextChannel) {
            debug("Received message from %s on %s : %s", discordMessage.author.username, discordMessage.channel.name, discordMessage.content);
        } else if (discordMessage.channel instanceof DMChannel) {
            debug("Received private message from %s : %s", discordMessage.author.username, discordMessage.content);
        }

        this.getAudio(discordMessage.author)
            .then((audio) => {
                if (audio) {
                    const user = new User(discordMessage.author, audio);
                    const message = new Message(discordMessage, user);

                    // TODO Factory ?
                    this.eventBus.dispatch(new MessageEvent(user, message));
                } else {
                    return Promise.reject("Audio is not working.");
                }
            })
            .catch((err) => {
                discordMessage.reply(err);
            });
    }

    private onPresenceUpdate(oldPresence: DiscordPresence | undefined, newPresence: DiscordPresence) {
        if (newPresence.user === null) return;

        const discordUser: DiscordUser = newPresence.user;

        this.getAudio(discordUser)
            .then((audio) => {
                if (audio) {
                    const user = new User(discordUser, audio);

                    // TODO Factory ?
                    this.eventBus.dispatch(new UserPresenceUpdateEvent(user, newPresence, oldPresence));
                } else {
                    return Promise.reject("Audio is not working.");
                }
            })
            .catch(debug);
    }
}
