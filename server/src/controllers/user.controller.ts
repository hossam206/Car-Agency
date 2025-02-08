import { Request, Response } from "express";
import UserService from "../services/userService";

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

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await this.serviceInstance
        .login(email, password)
        .catch((error) => {
          throw new Error(error.message || "Login failed");
        });

      if (user == null) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const token = this.serviceInstance.generateJwtToken(user);
      res.cookie("AuthToken", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.clearCookie("token");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Login successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  logout(req: Request, res: Response): void {
    res.clearCookie("AuthToken");
    res.status(200).json({ message: "Logout successfully" });
  }
}

export default UserController;
