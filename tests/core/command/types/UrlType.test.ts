import { UrlType } from "../../../../src/core/command/types/UrlType";

describe("UrlType", () => {
   const urlType = new UrlType();

   it("should return true for an url", () => {
      const url = "http://mynewurl.com/something.stuff";
      expect(urlType.validate(url)).toBeTruthy();
   });

   it("return the correct error message", () => {
      expect(urlType.getErrorMessage()).toBe("must be an url");
   });
});
