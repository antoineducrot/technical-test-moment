import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { type Request } from "express";

type CurrentUser = {
  sub: string;
  username: string;
};

const ExtractCurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: CurrentUser }>();

    return request.user;
  },
);

export { ExtractCurrentUser };

export type { CurrentUser };
