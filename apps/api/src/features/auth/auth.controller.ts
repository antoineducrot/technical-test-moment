import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LoginDto, LoginResponseDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post("login")
  @ApiOperation({ summary: "Login a user with email and password" })
  @ApiBody({ type: LoginDto, description: "User login details" })
  @ApiUnauthorizedResponse({
    description: "Unauthorized: \n" + "- AuthInvalidCredentials",
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: RegisterDto, description: "User registration details" })
  @ApiCreatedResponse({
    description: "User registered successfully",
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "Bad Request: \n" +
      "- UsersEmailAlreadyExist\n" +
      "- UsersUsernameAlreadyExist\n" +
      "- ServerValidationError",
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get("verify")
  @ApiOperation({ summary: "Verify the validity of a token" })
  @ApiBearerAuth()
  async verify() {
    return { message: "Token is valid" };
  }
}
