declare module 'youtube-audio-stream' {
    import { Readable } from "stream";
    /**
     * Fetches the audio from the YouTube video.
     *
     * @param uri YouTube video link.
     * @returns A audio stream.
     */
    export default function streamify(uri: string): Readable;
}
