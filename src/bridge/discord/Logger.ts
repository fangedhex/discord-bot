import { Message } from "discord.js";

export interface TextBasedChannel {
  send(message: string): Promise<Message>;
}

export class Logger {
  constructor(private channel: TextBasedChannel) {}

  info(message: string): void {
    this.channel.send(":information_source: " + message);
  }

  success(message: string): void {
    this.channel.send(":white_check_mark: " + message);
  }

  error(message: string): void {
    this.channel.send(":x: " + message);
  }
}
