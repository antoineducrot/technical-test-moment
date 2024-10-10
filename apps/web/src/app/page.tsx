import { H4 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { isUserDto } from "@/features/users";
import { GET } from "@/lib/fetch/server";

import { logoutAction } from "./_action/logout.action";

export default async function Page() {
  const response = await GET("users/me", isUserDto);

  const info =
    "error" in response ? (
      <H4 className="mt-4">There was an error</H4>
    ) : (
      <H4 className="mt-4">Welcome to you, {response.body.username}</H4>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>{info}</div>
      <form action={logoutAction} className="mt-4">
        <Button>Log Out</Button>
      </form>
    </div>
  );
}
