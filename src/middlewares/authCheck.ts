import e, { RequestHandler } from "express";
import varifyToken from "../utils/jwt/varifyToken";
import config from "../config";

const authCheck =
  (...role: string[]): RequestHandler =>
  async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      next("Token required");
    }

    const result = await varifyToken(
      refreshToken,
      config.jwt.REFRESH as string
    );
    req.user = result;
    if (role.includes(result.role)) {
      next();
    } else {
      next("Invalid user access");
    }
  };
export default authCheck;
