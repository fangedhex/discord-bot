import { IAudio, OnDemandStream } from "../../core/IAudio";
import { StreamDispatcher, VoiceConnection } from "discord.js";
import { Discord } from "./Discord";

export class Audio implements IAudio {
    private streamDispatcher?: StreamDispatcher;
    private volume: number = 1;
    private playlist: OnDemandStream[] = [];

    constructor(
        private discord: Discord,
        private voiceConnection: VoiceConnection
    ) {
    }

    private get playing(): boolean {
        return this.streamDispatcher !== undefined;
    }

    private playNextTrack() {
        if (this.playing) return;

        const streamOnDemand = this.playlist.shift();
        if (streamOnDemand) {
            // If we have still something to play
            this.streamDispatcher = this.voiceConnection.play(streamOnDemand(), {
                volume: this.volume
            });
            this.streamDispatcher.once("finish", () => {
                this.streamDispatcher = undefined;
                this.playNextTrack();
            });
        } else {
            // We notify our discord client that we finished playing everything
            this.voiceConnection.disconnect();
            this.discord.finishAudio();
        }
    }

    add(stream: OnDemandStream): void {
        this.playlist.push(stream);
        this.playNextTrack();
    }

    pause(): void {
        if (!this.playing) return;
        this.streamDispatcher?.pause();
    }

    resume(): void {
        if (!this.playing || !this.streamDispatcher?.paused) return;
        this.streamDispatcher?.resume();
    }

    setVolume(volume: number): void {
        this.volume = volume;
        this.streamDispatcher?.setVolume(volume);
    }

    skip(): void {
        this.streamDispatcher?.end();
        this.playNextTrack();
    }
}
