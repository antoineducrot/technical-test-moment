import { isRecord } from "@/lib/type-guard/is-record";

type UserDto = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

const isUserDto = (data: unknown): data is UserDto => {
  return (
    isRecord(data) &&
    typeof data.id === "string" &&
    typeof data.username === "string" &&
    typeof data.email === "string" &&
    typeof data.createdAt === "string" &&
    typeof data.updatedAt === "string"
  );
};

export { isUserDto, type UserDto };
