import { ApiProperty } from "@nestjs/swagger";

import { IsDefined, IsString } from "@/validation/validator.decorators";

class LoginDto {
  @ApiProperty({
    description: "The identifier for login, could be email or username",
    example: "example@example.com",
  })
  @IsString()
  @IsDefined()
  identifier!: string;

  @ApiProperty({
    description: "The password for the user",
    example: "super_password",
  })
  @IsString()
  @IsDefined()
  password!: string;
}

class LoginResponseDto {
  @ApiProperty({
    description: "JWT access token provided upon successful login",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
  })
  accessToken!: string;
}

export { LoginDto, LoginResponseDto };
