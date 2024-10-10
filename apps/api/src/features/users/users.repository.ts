import { Injectable } from "@nestjs/common";
import { type Users } from "@prisma/client";

import { PrismaService } from "@/database/prisma.service";

import { UserDto } from "./dtos/user.dto";
import { UserCreateDto } from "./dtos/user-create.dto";

const baseSelect: Record<keyof Omit<Users, "password">, true> = {
  id: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByIdentifier(identifier: string): Promise<UserDto | null> {
    return this.prisma.users.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
      select: baseSelect,
    });
  }

  async getById(id: string): Promise<UserDto | null> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
      select: baseSelect,
    });
  }

  async create(user: UserCreateDto): Promise<UserDto> {
    return this.prisma.users.create({
      data: user,
      select: baseSelect,
    });
  }
}

export { UsersRepository };
