import { z } from "zod";
import { ObjectId } from "mongodb";

export const UserDto = z.object({
  _id: z.union([z.string(), z.instanceof(ObjectId)]),
  email: z.string().email({ message: "Please enter a valid email address" }),
  username: z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.string().nullable().optional(),
});

export const UserAddDto = UserDto.pick({
  email: true,
  username: true,
  password: true,
});

export const UserLoginDto = UserDto.pick({
  email: true,
  password: true,
});

export const UserUpdateDto = UserDto.pick({
  password: true,
});

export type UserDtoType = z.infer<typeof UserDto>;
export type UserLoginDtoType = z.infer<typeof UserLoginDto>;
export type UserAddDtoType = z.infer<typeof UserAddDto>;
export type UserUpdateDtoType = z.infer<typeof UserUpdateDto>;
