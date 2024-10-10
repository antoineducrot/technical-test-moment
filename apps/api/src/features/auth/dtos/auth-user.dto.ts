import { ApiProperty } from "@nestjs/swagger";

class AuthUserDto {
  @ApiProperty({
    description: "The unique identifier of the user",
    example: "5f8f8c44b54764421b7156e1",
  })
  id!: string;

  @ApiProperty({
    description: "The username of the user",
    example: "example",
  })
  username!: string;

  @ApiProperty({
    description: "The password of the user",
    example: "super_password",
  })
  password!: string;
}

export { AuthUserDto };
