import { IsDefined, IsString } from "@/validation/validator.decorators";

class LoginDto {
  @IsString()
  @IsDefined()
  identifier!: string;

  @IsString()
  @IsDefined()
  password!: string;
}

class LoginResponseDto {
  accessToken!: string;
}

export { LoginDto, LoginResponseDto };
