import { registerAs } from "@nestjs/config";
import { z } from "zod";

const databaseConfig = registerAs("database", () => {
  const config = z
    .object({
      DATABASE_URL: z.string(),
    })
    .parse(process.env);

  return {
    url: config.DATABASE_URL,
  };
});

const appConfig = registerAs("app", () => {
  const config = z
    .object({
      PORT: z.string(),
    })
    .parse(process.env);

  return {
    port: config.PORT,
  };
});

const jwtConfig = registerAs("jwt", () => {
  const config = z
    .object({
      JWT_SECRET: z.string(),
      JWT_EXPIRES_IN: z.string(),
    })
    .parse(process.env);

  return {
    secret: config.JWT_SECRET,
    expiresIn: config.JWT_EXPIRES_IN,
  };
});

const config = [appConfig, databaseConfig, jwtConfig];

export { config };
