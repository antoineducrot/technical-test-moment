import { isEnumValue } from "@/lib/enum/is-enum-value";

import { ExceptionType, exceptionTypes } from "./exception-types.enum";

type ApiErrorResponseBody = {
  type: ExceptionType;
  message: string;
  errors?: Record<string, unknown>;
};

const isApiErrorResponseBody = (obj: unknown): obj is ApiErrorResponseBody => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const response = obj as ApiErrorResponseBody;

  return (
    isEnumValue(exceptionTypes, response.type) &&
    typeof response.message === "string" &&
    (response.errors === undefined ||
      (typeof response.errors === "object" && response.errors !== null))
  );
};

export { type ApiErrorResponseBody, isApiErrorResponseBody };
