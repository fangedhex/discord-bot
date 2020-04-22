import { Readable } from "stream";
import { User } from "../metadata/User";

export type OnDemandStream = () => Readable;

export interface IAudio {
    /**
     * Stream audio data
     * @param user User that want the audio stream
     * @param stream Audio to stream
     */
    stream(user: User, stream: OnDemandStream): void;

    /**
     * Pause current audio
     */
    pause(): void;

    /**
     * Resume last paused audio
     */
    resume(): void;

    /**
     * Set the audio's volume
     * @param volume
     */
    setVolume(volume: number): void;

    /**
     * Skip current track if possible
     */
    skip(): void;
}
