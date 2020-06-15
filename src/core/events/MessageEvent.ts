import { IUser } from "../IUser";
import { IMessage } from "../IMessage";

export class MessageEvent {
    constructor(public readonly sender: IUser, public readonly message: IMessage) {
    }
}
