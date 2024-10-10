"use server";

import { redirect } from "next/navigation";

import { ExceptionType } from "@/lib/api/exception-types.enum";
import { setCookieFromToken } from "@/lib/auth/set-cookie-from-token";
import { POST } from "@/lib/fetch/server";
import { isRecord } from "@/lib/type-guard/is-record";

import { LoginFormData } from "./login.form-schema";

type LoginFormState = {
  message: string;
  error: boolean;
};

const errorMessages: Partial<Record<ExceptionType, string>> = {
  AuthInvalidCredentials: "Invalid credentials",
} as const;

type LoginOutput = { accessToken: string };

const isLoginOutput = (output: unknown): output is LoginOutput => {
  return isRecord(output) && typeof output.accessToken === "string";
};

const loginAction = async ({
  identifier,
  password,
}: LoginFormData): Promise<LoginFormState> => {
  const response = await POST(
    "auth/login",
    { identifier, password },
    isLoginOutput,
  );

  if ("body" in response && setCookieFromToken(response.body.accessToken))
    redirect("/");

  if ("error" in response) {
    const message = errorMessages[response.error.type];

    if (message) return { message, error: true };
  }

  return { message: "An error occurred, please try again later", error: true };
};

export { loginAction };
export type { LoginFormState };
