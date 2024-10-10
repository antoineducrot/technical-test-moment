import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import {
  CurrentUser,
  ExtractCurrentUser,
} from "@/features/auth/decorators/current-user.decorator";

import { UserDto } from "./dtos/user.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
@ApiBearerAuth()
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get("me")
  @ApiOperation({ summary: "Get the current user" })
  @ApiResponse({
    status: 200,
    description: "User retrieved successfully.",
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized: \n" +
      "- AuthInvalidToken\n" +
      "- AuthAuthorizationHeaderNotFound\n" +
      "- AuthInvalidTokenFormat",
  })
  async me(@ExtractCurrentUser() user: CurrentUser) {
    return this.usersService.getById(user.sub);
  }
}

export { UsersController };
