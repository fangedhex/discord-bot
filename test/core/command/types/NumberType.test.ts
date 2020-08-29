import { NumberType } from "../../../../src/core/command/types/NumberType";

describe("NumberType", () => {
  const numberType = new NumberType();

  it("should be a number", () => {
    expect(numberType.validate("8.5")).toBeTruthy();
  });

  it("should NOT be a number", () => {
    expect(numberType.validate("test")).toBeFalsy();
  });

  it("should convert", () => {
    expect(numberType.convert("8.8")).toBe(8.8);
  });
});
