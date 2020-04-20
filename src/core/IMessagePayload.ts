import { User } from "../metadata/User";
import { IAudio } from "./IAudio";
import { IChat } from "./IChat";

export interface IMessagePayload {
    readonly sender: User;
    readonly message: string;
    readonly chat: IChat;
    readonly audio?: IAudio;
}
