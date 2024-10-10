type EnumValue<EnumObject> = EnumObject[keyof EnumObject];

const isEnumValue = <T extends Record<string, unknown>>(
  enumObject: T,
  value: unknown,
): value is EnumValue<T> =>
  typeof value === "string" && Object.values(enumObject).includes(value);

export { type EnumValue, isEnumValue };
