import { RequestHandler } from "express";
import { TLogin } from "../admin/admin.interface";
import { AuthService } from "./auth.service";
import sendResponse from "../../../global/sendResponse";

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const loginInfo: TLogin = req.body; 
    const { accessToken, refreshToken } = await AuthService.loginUser(
      loginInfo
    );
    const cookieOptions = {
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    sendResponse(res, {
      data: { accessToken },
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const loginInfo = req.user;
    if (!loginInfo) {
      throw "Invalid token";
    }
    const { accessToken, refreshToken } = await AuthService.getRefreshTokenDB(
      loginInfo
    );
    const cookieOptions = {
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    sendResponse(res, {
      data: { accessToken },
      message: "New access token generated successfully !",
    }); 
  } catch (error) {
    next(error);
  }
};

const authController = { loginUser, refreshToken };
export default authController;
