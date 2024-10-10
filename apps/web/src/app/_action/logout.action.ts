"use server";

import { redirect } from "next/navigation";

import { deleteCookie } from "@/lib/auth/delete-cookie";

const logoutAction = () => {
  deleteCookie();

  redirect("/login");
};

export { logoutAction };
