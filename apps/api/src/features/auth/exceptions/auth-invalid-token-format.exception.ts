import { HttpStatus } from "@nestjs/common";

import { DefaultException } from "@/exceptions/default.exception";

class AuthInvalidTokenFormatException extends DefaultException {
  constructor() {
    super(
      {
        type: "AuthInvalidTokenFormat",
        message: "invalid token format",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export { AuthInvalidTokenFormatException };
