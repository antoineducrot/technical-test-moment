"use server";

import { cookies } from "next/headers";

const deleteCookie = () => {
  const cookieStore = cookies();

  cookieStore.delete("token");
};

export { deleteCookie };
