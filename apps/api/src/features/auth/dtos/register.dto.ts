import { ApiProperty } from "@nestjs/swagger";

import {
  IsDefined,
  IsEmail,
  IsString,
  Length8And255,
} from "@/validation/validator.decorators";

class RegisterDto {
  @ApiProperty({
    description: "User's email address",
    example: "example@example.com",
  })
  @IsEmail()
  @IsString()
  @IsDefined()
  email!: string;

  @ApiProperty({
    description: "Username for the new account",
    example: "example",
  })
  @IsString()
  @IsDefined()
  username!: string;

  @ApiProperty({
    description: "Password with a length between 8 and 255 characters",
    example: "super_password",
  })
  @Length8And255()
  @IsString()
  @IsDefined()
  password!: string;
}

export { RegisterDto };
