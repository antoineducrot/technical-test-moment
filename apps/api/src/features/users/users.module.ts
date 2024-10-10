import { Module } from "@nestjs/common";

import { PrismaModule } from "@/database/prisma.module";

import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersRepository, UsersService],

  controllers: [UsersController],

  exports: [UsersService],

  imports: [PrismaModule],
})
export class UsersModule {}
