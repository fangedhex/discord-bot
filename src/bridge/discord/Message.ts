import { IMessage } from "../../core/IMessage";
import { Message as DiscordMessage } from "discord.js";
import { IUser } from "../../core/IUser";

export class Message implements IMessage {
  constructor(private discordMessage: DiscordMessage, private sender: IUser) {}

  getContent(): string {
    return this.discordMessage.content;
  }

  getSender(): IUser {
    return this.sender;
  }

  reply(message: string): void {
    this.discordMessage.reply(message);
  }
}
