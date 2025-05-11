import bcrypt from "bcryptjs";
import {
  UserAddDto,
  UserAddDtoType,
  UserDto,
  UserLoginDto,
  UserLoginDtoType,
  UserUpdateDto,
  UserUpdateDtoType,
} from "../dto/user.dto";
import User from "../models/mongodb/user.model";
import { ResponseType } from "../types/response.type";
import TokenService from "./token.service";
import { warpASync } from "../utils/warpAsync.util";

class UserService {
  private static instance: UserService;
  private tokenService: TokenService;

  private constructor() {
    this.tokenService = TokenService.getInstance();
  }

  static getServiceInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  addUser = async (body: UserAddDtoType): Promise<ResponseType> => {
    try {
      const parsed = UserAddDto.safeParse(body);
      if (!parsed.success)
        return {
          success: false,
          status: 400,
          statusText: "BadRequest",
          message: "Invalid data",
        };

      const user = await User.findOne({ email: body.email });
      if (user)
        return {
          success: false,
          status: 409,
          statusText: "Conflict",
          message: "User already exists",
        };

      await User.create({
        ...body,
        password: await bcrypt.hash(body.password, 10),
      });
      return {
        success: true,
        status: 201,
        statusText: "Created",
        message: "User registered successfully",
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error logging in"
      );
    }
  };

  login = async (body: UserLoginDtoType): Promise<ResponseType> => {
    try {
      const parsed = UserLoginDto.safeParse(body);
      if (!parsed.success)
        return {
          success: false,
          status: 400,
          statusText: "BadRequest",
          message: "Invalid data",
        };

      const user = await User.findOne({ email: body.email });
      if (!user)
        return {
          success: false,
          status: 404,
          statusText: "NotFound",
          message: "User not found",
        };

      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password
      );
      if (!isPasswordValid)
        return {
          success: false,
          status: 400,
          statusText: "BadRequest",
          message: "Invalid password",
        };

      const token = this.tokenService.generateTokens(user);
      return {
        success: true,
        status: 200,
        statusText: "OK",
        message: "Login successfully",
        data: token,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error logging in"
      );
    }
  };

  deleteUser = warpASync(async (_id: string): Promise<ResponseType> => {
    const user = await User.findById(_id);

    if (!user) {
      return {
        success: false,
        status: 404,
        statusText: "NotFound",
        message: "User not found",
      };
    }

    if (user.role === "admin") {
      return {
        success: false,
        status: 403,
        statusText: "Forbidden",
        message: "Admin user cannot be deleted",
      };
    }

    const deleteUser = await User.deleteOne({ _id });

    return {
      success: true,
      message: "User deleted successfully",
      deletedCount: deleteUser.deletedCount,
    };
  });

  updateUser = warpASync(
    async (_id: string, body: UserUpdateDtoType): Promise<ResponseType> => {
      const parsed = UserUpdateDto.safeParse(body);
      if (!parsed.success)
        return {
          success: false,
          status: 400,
          statusText: "BadRequest",
          message: "User validation failed",
        };

      const user = await User.findById(_id).select("password");
      if (!user) {
        return {
          success: false,
          status: 404,
          statusText: "NotFound",
          message: "User not found",
        };
      }

      const isSame = await bcrypt.compare(body.password, user.password);
      if (isSame) {
        return {
          success: false,
          status: 400,
          statusText: "BadRequest",
          message: "New password must be different from the current password",
        };
      }

      await User.updateOne(
        { _id },
        { $set: { password: await bcrypt.hash(body.password, 10) } }
      );
      return { success: true, message: "User updated successfully" };
    }
  );

  getAllUsers = warpASync(
    async (page = 1, limit = 5): Promise<ResponseType> => {
      const getUsers = await User.find({})
        .skip((page - 1) * limit)
        .limit(limit);
      if (!getUsers.length)
        return {
          success: false,
          status: 404,
          statusText: "NotFound",
          message: "User not found",
        };

      const data = getUsers.map((User) => {
        const parsed = UserDto.safeParse(User);
        if (!parsed.success)
          return {
            success: false,
            status: 400,
            statusText: "BadRequest",
            message: "User validation failed",
          };
        return parsed.data;
      });
      return { success: true, message: "User updated successfully", data };
    }
  );

  getUserById = warpASync(async (_id: string): Promise<ResponseType> => {
    const data = await User.findById({ _id });
    if (!data)
      return {
        success: false,
        status: 404,
        statusText: "NotFound",
        message: "User not found",
      };
    return { success: true, message: "User updated successfully", data };
  });

  getUserCount = warpASync(async (): Promise<number> => {
    return await User.countDocuments();
  });
}

export default UserService;
