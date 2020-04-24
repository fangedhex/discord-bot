import { inject, injectable, multiInject } from "inversify";
import { User } from "../metadata/User";
import { IAudio } from "./IAudio";
import { IChat } from "./IChat";
import { ICommandPayload } from "./ICommandPayload";
import { IMessagePayload } from "./IMessagePayload";
import { IModule } from "./Module";

export interface IMessageHandler {
    /**
     * Parse a message into a command if
     * @param payload
     */
    parseMessage(payload: IMessagePayload): void;

    /**
     * Run command
     * @param payload Message payload used
     * @param command Command to run
     * @param args Arguments given
     */
    runCommand(payload: IMessagePayload, command: string, args: string[]): void;
}

@injectable()
export class MessageHandler implements IMessageHandler {
    constructor(@multiInject("Modules") private modules: IModule[]) {
    }

    parseMessage(payload: IMessagePayload) {
        if (!payload.message.startsWith("$") || payload.message.length <= 1) return;

        const args = payload.message.slice("$".length).split(/ +/);
        // @ts-ignore
        const cmd = args.shift().toLowerCase();
        this.runCommand(payload, cmd, args);
    }

    runCommand(payload: IMessagePayload, command: string, args: string[]): void {
        const pl: ICommandPayload = {
            sender: payload.sender,
            command,
            args,
            chat: payload.chat,
            audio: payload.audio
        }

        this.modules.forEach((mod) => {
            if (mod.hasCommand(command)) {
                mod.runCommand(pl);
            }
        })
    }
}
