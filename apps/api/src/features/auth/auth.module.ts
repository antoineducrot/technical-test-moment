import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { PrismaModule } from "@/database/prisma.module";
import { UsersModule } from "@/features/users/users.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthUsersRepository } from "./auth-users.repository";
import { BcryptService } from "./bcrypt.service";

@Module({
  controllers: [AuthController],

  providers: [BcryptService, AuthUsersRepository, AuthService],

  exports: [AuthService],

  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.secret"),
        signOptions: { expiresIn: configService.get<string>("jwt.expiresIn") },
      }),
    }),

    UsersModule,
  ],
})
export class AuthModule {}
