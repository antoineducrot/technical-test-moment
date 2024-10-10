import { HttpException, type HttpStatus, Logger } from "@nestjs/common";

import { type ExceptionResponse } from "./exception-response.type";

export class DefaultException extends HttpException {
  constructor(
    { type, errors, message }: ExceptionResponse,
    status: HttpStatus,
  ) {
    super(
      {
        type,
        message,
        errors,
      },
      status,
    );

    Logger.verbose(message, type);
  }
}
