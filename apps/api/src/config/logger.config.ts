import { type LogLevel } from "@nestjs/common";

const loggerConfig: Record<string, LogLevel[]> = {
  local: ["log", "fatal", "error", "warn", "debug", "verbose"],
  development: ["log", "fatal", "error", "warn", "verbose"],
  production: ["fatal", "error", "warn"],
};

export { loggerConfig };
