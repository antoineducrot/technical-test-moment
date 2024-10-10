import {
  IsDefined,
  IsEmail,
  IsString,
  Length8And255,
} from "@/validation/validator.decorators";

class RegisterDto {
  @IsEmail()
  @IsString()
  @IsDefined()
  email!: string;

  @IsString()
  @IsDefined()
  username!: string;

  @Length8And255()
  @IsString()
  @IsDefined()
  password!: string;
}

export { RegisterDto };
