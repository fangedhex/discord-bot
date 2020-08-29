import { Audio } from "../../../src/bridge/discord/Audio";
import { StreamDispatcher, VoiceConnection } from "discord.js";
import { anyFunction, mock } from "jest-mock-extended";
import { Readable } from "stream";
import { Discord } from "../../../src/bridge/discord/Discord";

describe(Audio, () => {
  const discord = mock<Discord>();
  const voiceConnection = mock<VoiceConnection>();
  const audio = new Audio(discord, voiceConnection);
  const streamDispatcher = mock<StreamDispatcher>();

  it("adds to playlist and play it", () => {
    const stream = mock<Readable>();
    const onDemandStream = jest.fn().mockReturnValue(stream);

    // @ts-ignore
    voiceConnection.play.mockReturnValue(streamDispatcher);

    audio.add(onDemandStream);

    expect(onDemandStream).toHaveBeenCalled();
    expect(voiceConnection.play).toHaveBeenCalledWith(stream, { volume: 1 });
    expect(streamDispatcher.once).toHaveBeenCalledWith("finish", anyFunction());
  });

  it("pause", () => {
    audio.pause();
    expect(streamDispatcher.pause).toHaveBeenCalled();
  });

  it("resume", () => {
    audio.resume();
    expect(streamDispatcher.resume).toHaveBeenCalled();
  });

  it("sets volume", () => {
    audio.setVolume(0.5);
    expect(streamDispatcher.setVolume).toHaveBeenCalledWith(0.5);
  });
});
