import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { PrismaService } from "@/database/prisma.service";
import { exceptionTypes } from "@/exceptions/exception-types.enum";
import { AuthModule } from "@/features/auth/auth.module";
import { JwtAuthGuard } from "@/features/auth/guards/jwt.guard";
import { ServerValidationException } from "@/validation/exceptions/server-validation.exception";
import { validationErrorCodes } from "@/validation/validation.error-codes";

import { RegisterDto } from "../src/features/auth/dtos/register.dto";
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
      imports: [AuthModule],
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

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        stopAtFirstError: true,

        exceptionFactory(errors) {
          return new ServerValidationException(errors);
        },
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("POST /auth/register", () => {
    beforeAll(async () => {
      await request(app.getHttpServer()).post("/auth/register").send({
        email: "exist-example@example.com",
        username: "exist-example",
        password: "password",
      });
    });

    it("should return bad request on invalid email", async () => {
      const registerDto: RegisterDto = {
        email: "invalid-email",
        password: "password",
        username: "example",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          email: [validationErrorCodes.isNotValidEmail],
        },
        message: "Validation failed",
        type: exceptionTypes.serverValidation,
      });
    });

    it("should return bad request on too short", async () => {
      const registerDto: RegisterDto = {
        email: "example@example.com",
        password: "short",
        username: "example",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          password: [validationErrorCodes.lengthBetween8And255],
        },
        message: "Validation failed",
        type: exceptionTypes.serverValidation,
      });
    });

    it("should return bad request on missing username", async () => {
      const registerDto = {
        email: "example@example.com",
        password: "password",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          username: [validationErrorCodes.isNotDefined],
        },
        message: "Validation failed",
        type: exceptionTypes.serverValidation,
      });
    });

    it("should return bad request on missing email", async () => {
      const registerDto = {
        password: "password",
        username: "example",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          email: [validationErrorCodes.isNotDefined],
        },
        message: "Validation failed",
        type: exceptionTypes.serverValidation,
      });
    });

    it("should return bad request on missing password", async () => {
      const registerDto = {
        email: "example@example.com",
        username: "example",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          password: [validationErrorCodes.isNotDefined],
        },
        message: "Validation failed",
        type: exceptionTypes.serverValidation,
      });
    });

    it("should return conflict on email already exists", async () => {
      const registerDto: RegisterDto = {
        email: "exist-example@example.com",
        username: "example",
        password: "password",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(409);

      expect(response.body).toEqual({
        message: `email already exist: ${registerDto.email}`,
        type: exceptionTypes.usersEmailAlreadyExist,
      });
    });

    it("should return conflict on username already exists", async () => {
      const registerDto: RegisterDto = {
        email: "example@example.com",
        username: "exist-example",
        password: "password",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(409);

      expect(response.body).toEqual({
        message: `username already exist: ${registerDto.username}`,
        type: exceptionTypes.usersUsernameAlreadyExist,
      });
    });

    it("should register successfully", async () => {
      const registerDto: RegisterDto = {
        email: "example@example.com",
        username: "example",
        password: "password",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(201);

      expect(response.body).toEqual({ accessToken: expect.any(String) });
    });
  });

  describe("POST /auth/login", () => {
    beforeAll(async () => {
      await request(app.getHttpServer()).post("/auth/register").send({
        email: "login-example@example.com",
        username: "login-example",
        password: "password",
      });
    });

    it("should return bad request on missing identifier", async () => {
      const loginDto = {
        password: "password",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/login")
        .send(loginDto)
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          identifier: [validationErrorCodes.isNotDefined],
        },
        message: "Validation failed",
        type: exceptionTypes.serverValidation,
      });
    });

    it("should return bad request on missing password", async () => {
      const loginDto = {
        identifier: "login-example",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/login")
        .send(loginDto)
        .expect(400);

      expect(response.body).toEqual({
        errors: {
          password: [validationErrorCodes.isNotDefined],
        },
        message: "Validation failed",
        type: exceptionTypes.serverValidation,
      });
    });

    it("should return unauthorized on invalid credentials", async () => {
      const loginDto = {
        identifier: "login-example",
        password: "wrong_password",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/login")
        .send(loginDto)
        .expect(401);

      expect(response.body).toEqual({
        message: "invalid credentials",
        type: exceptionTypes.authInvalidCredentials,
      });
    });

    it("should login successfully", async () => {
      const loginDto = {
        identifier: "login-example",
        password: "password",
      };

      const response = await request(app.getHttpServer())
        .post("/auth/login")
        .send(loginDto)
        .expect(201);

      expect(response.body).toEqual({ accessToken: expect.any(String) });
    });
  });

  describe("GET /auth/verify", () => {
    beforeAll(async () => {
      await request(app.getHttpServer()).post("/auth/register").send({
        email: "verify-example@example.com",
        username: "verify-example",
        password: "password",
      });
    });

    it("should return unauthorized on missing authorization header", async () => {
      const response = await request(app.getHttpServer())
        .get("/auth/verify")
        .expect(401);

      expect(response.body).toEqual({
        message: "authorization header not found",
        type: exceptionTypes.authAuthorizationHeaderNotFound,
      });
    });

    it("should return unauthorized on invalid token format", async () => {
      const response = await request(app.getHttpServer())
        .get("/auth/verify")
        .set("Authorization", "invalid token")
        .expect(401);

      expect(response.body).toEqual({
        message: "invalid token format",
        type: exceptionTypes.authInvalidTokenFormat,
      });
    });

    it("should verify token successfully", async () => {
      const loginResponse = await request(app.getHttpServer())
        .post("/auth/login")
        .send({
          identifier: "verify-example",
          password: "password",
        });

      const response = await request(app.getHttpServer())
        .get("/auth/verify")
        .set("Authorization", `Bearer ${loginResponse.body.accessToken}`)
        .expect(200);

      expect(response.body).toEqual({ message: "token is valid" });
    });
  });
});
