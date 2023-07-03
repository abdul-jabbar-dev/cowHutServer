import { RequestHandler } from "express";
import adminService from "./admin.service";
import sendResponse from "../../../global/sendResponse";
import TAdmin, { TLogin } from "./admin.interface";

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const adminInfo: TAdmin = req.body;
    const { password, ...others } = await adminService.createAdminDB(adminInfo);
    sendResponse(res, { message: "User logged in successfully", data: others });
  } catch (err) {
    next(err);
  }
};
const loginAdmin: RequestHandler = async (req, res, next) => {
  try {
    const loginInfo: TLogin = req.body;
    const { accessToken, refreshToken } = await adminService.loginAdminDB(
      loginInfo
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });
    sendResponse(res, {
      message: "Admin created successfully",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};
const adminController = {
  createAdmin,
  loginAdmin,
};
export default adminController;
