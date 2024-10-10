import { HttpStatus } from "@nestjs/common";

import { DefaultException } from "@/exceptions/default.exception";

class AuthTokenNotFoundException extends DefaultException {
  constructor() {
    super(
      {
        type: "AuthTokenNotFound",
        message: "token not found",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export { AuthTokenNotFoundException };
