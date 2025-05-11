export type UserRequestType = {
  userId: string;
  carId?: string;
  email: string;
  role: "admin" | "user";
};
