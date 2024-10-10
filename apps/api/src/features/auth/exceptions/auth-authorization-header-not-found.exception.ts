import { HttpStatus } from "@nestjs/common";

import { DefaultException } from "@/exceptions/default.exception";

class AuthAuthorizationHeaderNotFoundException extends DefaultException {
  constructor() {
    super(
      {
        type: "AuthAuthorizationHeaderNotFound",
        message: "authorization header not found",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export { AuthAuthorizationHeaderNotFoundException };
