import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserDtoType } from "../dto/user.dto";
import { encryptToken } from "../utils/encryptToken.utils";
dotenv.config();

class TokenService {
  private static instanceService: TokenService;
  public static getInstance(): TokenService {
    if (!TokenService.instanceService) {
      TokenService.instanceService = new TokenService();
    }
    return TokenService.instanceService;
  }

  generateIdToken = (user: UserDtoType, carId: string) => {
    const payload = {
      userId: user._id,
      carId,
      role: user.role,
    };
    return jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET));
  };

  generateTokens = (user: UserDtoType): object => {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = jwt.sign(
      payload,
      String(process.env.ACCESS_TOKEN_SECRET),
      {
        expiresIn: "30m",
        algorithm: "HS256",
      }
    );

    const refreshToken = jwt.sign(
      payload,
      String(process.env.REFRESH_TOKEN_SECRET),
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };
}

export default TokenService;
