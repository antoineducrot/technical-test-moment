import { HttpStatus } from "@nestjs/common";

import { DefaultException } from "@/exceptions/default.exception";

class AuthInvalidCredentialsException extends DefaultException {
  constructor() {
    super(
      {
        type: "AuthInvalidCredentials",
        message: "invalid credentials",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export { AuthInvalidCredentialsException };
