import { Request, Response } from "express";
import UserService from "../services/user.service";
import { encryptToken } from "../utils/encryptToken.utils";

class UserController {
  private serviceInstance: UserService;
  private static instance: UserController;

  private constructor() {
    this.serviceInstance = UserService.getServiceInstance();
  }

  static getControllerInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  private handleError(
    res: Response,
    message: string,
    error: unknown,
    status = 500
  ): Response {
    return res.status(status).send({
      message,
      error: error instanceof Error ? error.message : error,
    });
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const authResult = await this.serviceInstance.login(req.body);
      if (!authResult.success)
        return res.status(authResult.status!).json(authResult);
      const { data, ...responseData } = authResult;
      this.generateCookies(res, data);
      return res
        .status(200)
        .json({ ...responseData, accessToken: encryptToken(data.accessToken) });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async addUser(req: Request, res: Response): Promise<Response> {
    try {
      const authResult = await this.serviceInstance.addUser(req.body);
      if (!authResult.success)
        return res.status(authResult.status!).json(authResult);
      return res.status(201).json(authResult);
    } catch (error) {
      return this.handleError(res, "Internal Server Error", error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.deleteUser(
        req.params.userId,
        req.user.role
      );
      if (!result.success) return res.status(404).json(result);
      return res.status(200).json(result);
    } catch (error) {
      return this.handleError(res, "Internal Server Error", error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.updateUser(
        req.params.userId,
        req.body
      );
      if (!result.success) return res.status(400).json(result);
      return res.status(200).json(result);
    } catch (error) {
      return this.handleError(res, "Internal Server Error", error);
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit } = req.query;
      const result = await this.serviceInstance.getAllUsers(
        Number(page),
        Number(limit)
      );
      const count = await this.serviceInstance.getUserCount();
      if (!result.success) return res.status(404).json(result);
      return res.status(200).json({
        message: "Users retrieved successfully",
        data: result,
        count: count,
      });
    } catch (error) {
      return this.handleError(res, "Internal Server Error", error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.serviceInstance.getUserById(req.params.userId);
      if (!result.success) return res.status(404).json(result);
      return res.status(200).json(result);
    } catch (error) {
      return this.handleError(res, "Internal Server Error", error);
    }
  }

  async getUserCount(req: Request, res: Response): Promise<Response> {
    try {
      const count = await this.serviceInstance.getUserCount();
      return res
        .status(200)
        .json({ message: "User count retrieved successfully", count });
    } catch (error) {
      return this.handleError(res, "Internal Server Error", error);
    }
  }

  logout(req: Request, res: Response): Response {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logout successfully" });
  }

  private generateCookies(
    res: Response,
    data: { refreshToken: string; accessToken: string }
  ) {
    const isProduction = process.env.NODE_ENV === "production";
    const options = {
      httpOnly: true,
      sameSite: isProduction ? ("none" as "none") : ("lax" as "lax"),
      secure: isProduction,
    };
    const tokens = [
      {
        name: "refreshToken",
        value: data.refreshToken,
        expires: 60 * 24 * 7,
      },
      {
        name: "accessToken",
        value: data.accessToken,
        expires: 60,
      },
    ];

    tokens.forEach((token) => {
      if (token.value != undefined) {
        res.cookie(token.name, encryptToken(String(token.value)), {
          ...options,
          expires: new Date(Date.now() + 1000 * 60 * token.expires),
        });
      }
    });
  }
}

export default UserController;
