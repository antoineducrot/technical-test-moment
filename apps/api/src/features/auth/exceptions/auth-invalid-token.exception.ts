import { HttpStatus } from "@nestjs/common";

import { DefaultException } from "@/exceptions/default.exception";

class AuthInvalidTokenException extends DefaultException {
  constructor() {
    super(
      {
        type: "AuthInvalidToken",
        message: "invalid token",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export { AuthInvalidTokenException };
