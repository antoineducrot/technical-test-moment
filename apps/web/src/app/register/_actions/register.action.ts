"use server";

import { redirect } from "next/navigation";

import { ExceptionType } from "@/lib/api/exception-types.enum";
import { setCookieFromToken } from "@/lib/auth/set-cookie-from-token";
import { POST } from "@/lib/fetch/server";
import { isRecord } from "@/lib/type-guard/is-record";

import { RegisterFormData } from "./register.form-schema";

type RegisterFormState = {
  message: string;
  error: boolean;
};

const errorMessages: Partial<Record<ExceptionType, string>> = {
  UsersUsernameAlreadyExist: "This username is already taken",
  UsersEmailAlreadyExist: "This email is already registered",
} as const;

type RegisterOutput = { accessToken: string };

const isRegisterOutput = (output: unknown): output is RegisterOutput => {
  return isRecord(output) && typeof output.accessToken === "string";
};

const registerAction = async ({
  username,
  email,
  password,
}: RegisterFormData): Promise<RegisterFormState> => {
  const response = await POST(
    "auth/register",
    { username, email, password },
    isRegisterOutput,
  );

  if ("body" in response && setCookieFromToken(response.body.accessToken))
    redirect("/");

  if ("error" in response) {
    const message = errorMessages[response.error.type];

    if (message) return { message, error: true };
  }

  return { message: "An error occurred, please try again later", error: true };
};

export { registerAction };
export type { RegisterFormState };
