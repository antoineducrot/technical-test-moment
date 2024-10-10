import { type ExceptionType } from "./exception-types.enum";

type ExceptionResponse = {
  type: ExceptionType;
  message: string;
  errors?: Record<string, unknown>;
};

export type { ExceptionResponse };
