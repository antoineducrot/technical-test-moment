import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { AuthService } from "@/features/auth/auth.service";
import { CurrentUser } from "@/features/auth/decorators/current-user.decorator";
import { AuthAuthorizationHeaderNotFoundException } from "@/features/auth/exceptions/auth-authorization-header-not-found.exception";
import { AuthInvalidTokenException } from "@/features/auth/exceptions/auth-invalid-token.exception";
import { AuthInvalidTokenFormatException } from "@/features/auth/exceptions/auth-invalid-token-format.exception";

@Injectable()
class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: CurrentUser }>();

    const token = this.extractTokenFromHeader(request);

    try {
      request.user = await this.authService.validateAccessToken(token);
    } catch {
      throw new AuthInvalidTokenException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    if (!request.headers.authorization) {
      throw new AuthAuthorizationHeaderNotFoundException();
    }

    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    if (type !== "Bearer" || !token) {
      throw new AuthInvalidTokenFormatException();
    }

    return token;
  }
}

export { JwtAuthGuard };
