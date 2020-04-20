import { User } from "../metadata/User";

export interface IChat {
    /**
     * Send a message to the text chat (with a recipient or not)
     * @param message Message to send
     * @param recipient User that will receive or be tagged for the message
     */
    send(message: string, recipient?: User): void;
}
