"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { secondToMillisecond } from "@/lib/convert/second-to-millisecond";

const setCookieFromToken = (token: string) => {
  const decoded = jwtDecode(token);

  if (!decoded || !decoded.exp) return false;

  const expires = secondToMillisecond(decoded.exp);

  const cookieStore = cookies();

  cookieStore.set("token", token, {
    expires,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return true;
};

export { setCookieFromToken };
