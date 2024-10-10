import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/database/prisma.service";

import { AuthUserDto } from "./dtos/auth-user.dto";

@Injectable()
export class AuthUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByIdentifier(identifier: string): Promise<AuthUserDto | null> {
    return this.prisma.users.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }
}
