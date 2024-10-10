import { HttpStatus } from "@nestjs/common";

import { DefaultException } from "@/exceptions/default.exception";

class UsersUsernameAlreadyExistException extends DefaultException {
  constructor(username: string) {
    super(
      {
        type: "UsersUsernameAlreadyExist",
        message: `username already exist: ${username}`,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export { UsersUsernameAlreadyExistException };
