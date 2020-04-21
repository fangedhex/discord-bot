import { Musique } from "../../../src/modules/musique/MusiqueModule";

test("should have command", () => {
    const musique = new Musique();

    expect(musique.hasCommand("yt")).toBeTruthy();
    expect(musique.hasCommand("setvol")).toBeTruthy();
    expect(musique.hasCommand("pause")).toBeTruthy();
    expect(musique.hasCommand("resume")).toBeTruthy();
})
