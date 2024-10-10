import { z } from "zod";

const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export { type LoginFormData, loginSchema };
