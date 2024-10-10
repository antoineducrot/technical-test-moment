const validationErrorCodes = {
  isNotDefined: "IsNotDefined",
  isEmpty: "IsEmpty",
  isNotString: "IsNotString",
  isNotValidEmail: "IsNotValidEmail",
  lengthBetween8And255: "LengthBetween8And255",
  unknown: "Unknown",
} as const;

type ValidationErrorCodes =
  (typeof validationErrorCodes)[keyof typeof validationErrorCodes];

export { type ValidationErrorCodes, validationErrorCodes };
