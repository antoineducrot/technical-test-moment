"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ApiErrorResponseBody,
  isApiErrorResponseBody,
} from "@/lib/api/api-error-response.type";
import { isProduction } from "@/lib/env/is-production";

const { NEXT_PUBLIC_API_URL } = process.env;

type FetchResponse<Output> =
  | {
      body: Output;
    }
  | {
      error: ApiErrorResponseBody;
    };

const convertToOutput = async <Output>(
  response: Response,
  isOutput?: (data: unknown) => data is Output,
): Promise<FetchResponse<Output>> => {
  const body = await response.json();

  if (!isOutput || isOutput(body)) {
    return {
      body,
    };
  }

  if (isApiErrorResponseBody(body)) {
    return {
      error: body,
    };
  }

  throw new Error(
    isProduction()
      ? "An error occurred"
      : `Response body is not as expected: ${JSON.stringify(body)}`,
  );
};

const checkAuth = async (response: Response) => {
  if (response.status === 401) {
    redirect("/login");
  }
};

const REQUEST = async <Output, Input>(
  url: string,
  method: string,
  isOutput?: (data: unknown) => data is Output,
  data?: Input,
) => {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(data && { body: JSON.stringify(data) }),
  });

  checkAuth(response);

  return convertToOutput(response, isOutput);
};

const POST = async <Input extends Record<string, unknown>, Output>(
  url: string,
  data?: Input,
  isOutput?: (data: unknown) => data is Output,
) => {
  return REQUEST(url, "POST", isOutput, data);
};

const GET = async <Output>(
  url: string,
  isOutput?: (data: unknown) => data is Output,
) => {
  return REQUEST(url, "GET", isOutput);
};

export { GET, POST };
