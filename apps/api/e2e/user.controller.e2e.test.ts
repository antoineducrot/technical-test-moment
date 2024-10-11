import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { PrismaService } from "@/database/prisma.service";
import { AuthModule } from "@/features/auth/auth.module";
import { JwtAuthGuard } from "@/features/auth/guards/jwt.guard";
import { UsersModule } from "@/features/users/users.module";

import { prismaService } from "./setup-tests.e2e";

describe("AuthController", () => {
  let app: INestApplication;

  const configService = {
    get: (key: string) => {
      if (key === "jwt.secret") {
        return "secret";
      } else if (key === "jwt.expiresIn") {
        return "1d";
      }
    },
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthModule],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .overrideProvider(ConfigService)
      .useValue(configService)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /users/me", () => {
    beforeAll(async () => {
      await request(app.getHttpServer()).post("/auth/register").send({
        email: "me-example@example.com",
        username: "me-example",
        password: "password",
      });
    });

    it("should return the current user", async () => {
      const loginResponse = await request(app.getHttpServer())
        .post("/auth/login")
        .send({
          identifier: "me-example",
          password: "password",
        });

      const response = await request(app.getHttpServer())
        .get("/users/me")
        .set("Authorization", `Bearer ${loginResponse.body.accessToken}`)
        .expect(200);

      expect(response.body).toEqual({
        createdAt: expect.any(String),
        email: "me-example@example.com",
        id: expect.any(String),
        username: "me-example",
        updatedAt: expect.any(String),
      });
    });
  });
});
