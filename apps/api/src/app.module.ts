import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";

import { config } from "./config";
import { PrismaModule } from "./database/prisma.module";
import { AuthModule } from "./features/auth/auth.module";
import { JwtAuthGuard } from "./features/auth/guards/jwt.guard";
import { UsersModule } from "./features/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
