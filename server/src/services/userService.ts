import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserDtoType, UserDto } from "../dto/user.dto";
import User from "../models/mongodb/user.model";

class UserService {
  private static instance: UserService;

  private constructor() {}

  static getServiceInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async login(email: string, password: string): Promise<UserDtoType> {
    try {
      const user = await User.findOne({ email: email });
      if (!user) throw new Error("User not found");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid password");
      const parsed = UserDto.safeParse(user);
      if (!parsed.success) {
        throw new Error("User validation failed");
      }
      return parsed.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error logging in",
      );
    }
  }

  generateJwtToken(user: UserDtoType): string {
    return jwt.sign({ email: user.email, role: user.role }, "slat", {
      expiresIn: "7d",
      algorithm: "HS256",
    });
  }
}

export default UserService;
