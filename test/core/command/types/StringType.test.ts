import { StringType } from "../../../../src/core/command/types/StringType";

describe("StringType", () => {
  const stringType = new StringType();

  it("should return true", () => {
    expect(stringType.validate("test")).toBeTruthy();
  });

  it("should return test", () => {
    expect(stringType.convert("test")).toBe("test");
  });

  it("return the correct error message", () => {
    expect(stringType.getErrorMessage()).toBe("must be a string");
  });
});
