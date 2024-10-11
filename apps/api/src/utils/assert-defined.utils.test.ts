import { assertDefined } from "./assert-defined.utils";

describe("assertDefined", () => {
  it("should return the value if it is defined", () => {
    const value = "test value";

    expect(assertDefined(value)).toBe(value);
  });

  it("should throw an error if the value is undefined", () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(() => assertDefined(undefined)).toThrow(
      "Provided value should not be undefined",
    );
  });

  it("should throw an error with a custom message if provided", () => {
    const customMessage = "Custom error message";

    expect(() => assertDefined(undefined, customMessage)).toThrow(
      customMessage,
    );
  });
});
