import { Logger } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

export const requestLoggerMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  Logger.debug(
    `${req.method} ${req.originalUrl} - body: ${JSON.stringify(req.body)}`,
    "Request",
  );

  if (next) {
    next();
  }
};
