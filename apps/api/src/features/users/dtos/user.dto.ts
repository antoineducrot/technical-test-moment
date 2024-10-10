import { ApiProperty } from "@nestjs/swagger";

class UserDto {
  @ApiProperty({
    description: "The unique identifier of the user",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id!: string;

  @ApiProperty({
    description: "The username of the user",
    example: "example",
  })
  username!: string;

  @ApiProperty({
    description: "The email of the user",
    example: "example@example.com",
  })
  email!: string;

  @ApiProperty({
    description: "The date the user was created",
    type: String,
    example: "2024-10-10T10:00:00Z",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "The date the user was last updated",
    type: String,
    example: "2024-10-10T10:00:00Z",
  })
  updatedAt!: Date;
}

export { UserDto };
