import { Request, Response, NextFunction } from "express";
import { UserRequestType } from "../types/request.type";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/mongodb/user.model";
import { decryptToken, encryptToken } from "../utils/encryptToken.utils";
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    user: UserRequestType;
  }
}

export class AuthMiddleware {
  private static instance: AuthMiddleware;
  public static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  verifyIdTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const idToken = req.params?.carId;
    const decoded = jwt.verify(
      idToken,
      String(process.env.ACCESS_TOKEN_SECRET)
    ) as UserRequestType;
    if (!idToken) return res.status(401).json({ message: "Unauthorized" });

    const getUser = await User.findById({ _id: decoded.userId }).lean();
    if (!getUser) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded as UserRequestType;
    return next();
  };

  authorizationMiddleware = (role: string[]): any => {
    return (
      req: Request,
      res: Response,
      next: NextFunction
    ): void | Response => {
      if (!role.includes(req.user?.role))
        return res
          .status(403)
          .json({ message: "unauthorized: Access denied." });
      return next();
    };
  };

  refreshTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    if (accessToken) {
      try {
        const decoded = jwt.verify(
          decryptToken(accessToken),
          String(process.env.ACCESS_TOKEN_SECRET)
        );
        req.user = decoded as UserRequestType;
        return next();
      } catch (error) {}
    }

    const decoded = jwt.verify(
      decryptToken(refreshToken),
      String(process.env.REFRESH_TOKEN_SECRET)
    );

    if (typeof decoded !== "object")
      return res.status(401).json({ message: "Unauthorized" });

    const { iat, exp, ...payload } = decoded;
    const newAccessToken = jwt.sign(
      payload,
      String(process.env.ACCESS_TOKEN_SECRET),
      { expiresIn: "30m" }
    );

    res.cookie("accessToken", encryptToken(newAccessToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 60 * 1000,
    });

    req.user = payload as UserRequestType;
    return next();
  };
}
