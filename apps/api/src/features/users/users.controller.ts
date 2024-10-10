import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

import {
  CurrentUser,
  ExtractCurrentUser,
} from "@/features/auth/decorators/current-user.decorator";

import { UsersService } from "./users.service";

@Controller("users")
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get("me")
  async me(@ExtractCurrentUser() user: CurrentUser) {
    return this.usersService.getById(user.sub);
  }
}

export { UsersController };
