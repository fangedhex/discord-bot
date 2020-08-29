import { mock } from "jest-mock-extended";
import { Readable } from "stream";
import { IAudio, OnDemandStream } from "../../../../src/core/IAudio";
import { PlayAudioCommand } from "../../../../src/modules/musique/commands/PlayAudioCommand";
import { IUser } from "../../../../src/core/IUser";

describe(PlayAudioCommand, () => {
  it("adds stream", () => {
    const audio = mock<IAudio>({
      add(stream: OnDemandStream) {
        expect(stream()).toBeInstanceOf(Readable);
      },
    });
    const sender = mock<IUser>({
      getAudio() {
        return audio;
      },
    });

    const playAudioCommand = new PlayAudioCommand();
    expect(playAudioCommand.getName()).toBe("yt");
    playAudioCommand.run(sender, { url: "http://dummyurl.com" });
  });
});
