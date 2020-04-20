import { User } from "../metadata/User";
import { IAudio } from "./IAudio";
import { IChat } from "./IChat";

export interface ICommandPayload {
    readonly sender: User;
    readonly command: string;
    readonly args: string[];
    readonly chat: IChat;
    readonly audio?: IAudio;
}
