import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

class AuthenticationMiddleware {
  static authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void {
    try {
      const token = req.cookies?.AuthToken;
      if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided." });
        return;
      }
      const user = jwt.verify(token, "slat", { algorithms: ["HS256"] });
      if (!user) {
        res.status(401).json({ message: "Invalid Auth Token." });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: "Authentication error." });
    }
  }
}

export default AuthenticationMiddleware;
