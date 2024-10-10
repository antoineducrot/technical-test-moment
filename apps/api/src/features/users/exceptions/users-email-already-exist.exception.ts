import { HttpStatus } from "@nestjs/common";

import { DefaultException } from "@/exceptions/default.exception";

class UsersEmailAlreadyExistException extends DefaultException {
  constructor(email: string) {
    super(
      {
        type: "UsersEmailAlreadyExist",
        message: `email already exist: ${email}`,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export { UsersEmailAlreadyExistException };
