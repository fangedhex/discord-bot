import { IUser } from "../../core/IUser";
import { User as DiscordUser } from "discord.js";
import { IAudio } from "../../core/IAudio";

export class User implements IUser {
    constructor(private discordUser: DiscordUser, private audio: IAudio) {
    }

    getName(): string {
        return this.discordUser.username;
    }

    sendText(message: string): void {
        this.discordUser.send(message);
    }

    getAudio() {
        return this.audio;
    }
}
