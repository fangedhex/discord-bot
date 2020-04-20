import { Readable } from "stream";
import { User } from "../metadata/User";

export interface IAudio {
    /**
     * Stream audio data
     * @param user User that want the audio stream
     * @param stream Audio to stream
     */
    stream(user: User, stream: Readable): void;
}
