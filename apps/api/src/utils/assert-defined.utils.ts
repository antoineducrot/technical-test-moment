export const assertDefined = <T>(
  value: T | undefined,
  message = "Provided value should not be undefined",
): T => {
  if (value === undefined) {
    throw new Error(message);
  }

  return value;
};
