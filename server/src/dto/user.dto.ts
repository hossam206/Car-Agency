import { z } from "zod";

export const UserDto = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.string().nullable().optional(),
});

export type UserDtoType = z.infer<typeof UserDto>;
