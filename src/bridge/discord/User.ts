import { IUser } from "../../core/IUser";
import { User as DiscordUser } from "discord.js";

export class User implements IUser {
    constructor(private discordUser: DiscordUser) {
    }

    getName(): string {
        return this.discordUser.username;
    }

    sendText(message: string): void {
        this.discordUser.send(message);
    }
}
