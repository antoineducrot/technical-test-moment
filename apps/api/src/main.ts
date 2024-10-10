import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { json } from "express";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { loggerConfig } from "./config/logger.config";
import { requestLoggerMiddleware } from "./logger/request-logger.middleware";
import { assertDefined } from "./utils/assert-defined.utils";
import { ServerValidationException } from "./validation/exceptions/server-validation.exception";

async function bootstrap() {
  const env = process.env.NODE_ENV ?? "local";

  const app = await NestFactory.create(AppModule, {
    logger: loggerConfig[env],
    bodyParser: false,
  });

  app.use(helmet());

  app.use(cookieParser());

  app.use(json());

  if (env === "local") app.use(requestLoggerMiddleware);

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

  const configService = app.get(ConfigService);

  const port = assertDefined(
    configService.get<string>("app.port"),
    "Environment variable PORT is not defined",
  );

  const config = new DocumentBuilder()
    .setTitle("Moment API")
    .setDescription("This is the API for the Moment app.")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/", app, document);

  await app.listen(port);
}

void bootstrap();
