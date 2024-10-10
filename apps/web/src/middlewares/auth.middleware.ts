import { cookies as getCookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const { NEXT_PUBLIC_API_URL } = process.env;

const unauthenticatedPages = new Set(["/login", "/register"]);

const authenticatedPages = new Set(["/"]);

const verify = async (token: string, request: NextRequest) => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    const nextResponse = NextResponse.redirect(new URL("/login", request.url));

    nextResponse.cookies.delete("token");

    return nextResponse;
  }

  return NextResponse.next();
};

const authMiddleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const session = getCookies().get("token");

  const isUnauthenticatedPages = unauthenticatedPages.has(pathname);

  const isAuthenticatedPages = authenticatedPages.has(pathname);

  if (!session && isAuthenticatedPages) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session) {
    if (isUnauthenticatedPages)
      return NextResponse.redirect(new URL("/", request.url));

    return verify(session.value, request);
  }

  return NextResponse.next();
};

const authMatcher = `/((?!api|_next/static|_next/image|.*\\..*).*)`;

export { authMatcher, authMiddleware };
