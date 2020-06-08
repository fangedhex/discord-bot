import { IMessage } from "../../core/IMessage";
import { Message as DiscordMessage } from "discord.js";
import { User } from "./User";
import { IUser } from "../../core/IUser";

export class Message implements IMessage {
    constructor(private discordMessage: DiscordMessage) {
    }

    getContent(): string {
        return this.discordMessage.content;
    }

    getSender(): IUser {
        // TODO Factory ?
        return new User(this.discordMessage.author);
    }

    reply(message: string): void {
        this.discordMessage.reply(message);
    }
}
