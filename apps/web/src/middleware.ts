import type { NextRequest } from "next/server";

import { authMiddleware } from "./middlewares/auth.middleware";

export const middleware = (request: NextRequest) => {
  return authMiddleware(request);
};

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|.*\\..*).*)`],
};
