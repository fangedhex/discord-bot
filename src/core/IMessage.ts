import { IUser } from "./IUser";

/**
 * Represents a message
 * Its implementation is made by the bridges
 */
export interface IMessage {
    getSender(): IUser;
    getContent(): string;

    reply(message: string): void;
}
