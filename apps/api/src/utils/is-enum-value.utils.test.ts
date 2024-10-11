import { isEnumValue } from "./is-enum-value.utils";

const Example = {
  One: "one",
  Two: "two",
} as const;

describe("isEnumValue with const-like enum object", () => {
  it("should return true for valid enum values", () => {
    expect(isEnumValue(Example, "one")).toBe(true);
    expect(isEnumValue(Example, "two")).toBe(true);
  });

  it("should return false for invalid enum values", () => {
    expect(isEnumValue(Example, "three")).toBe(false);
    expect(isEnumValue(Example, 123)).toBe(false);
    expect(isEnumValue(Example, null)).toBe(false);
  });
});
