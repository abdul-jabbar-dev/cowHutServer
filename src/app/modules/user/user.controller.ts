import { RequestHandler } from "express";
import userService from "./user.service";
import { TUser } from "./user.interface";
import sendResponse from "../../../global/sendResponse";
import { JwtPayload } from "jsonwebtoken";
const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const result: TUser[] = await userService.getAllUserDB();
    sendResponse(res, {
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.getAUserDB(id);
    sendResponse(res, {
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { password, ...result }: TUser = await userService.createUserDB(
      req.body
    );
    sendResponse(res, {
      message: "Users created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateAUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateInfo: Partial<TUser> = req.body;
    const result: TUser | null = await userService.updateUserDB(id, updateInfo);
    sendResponse(res, {
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.user as JwtPayload;
    const updateInfo = req.body;
    const result = await userService.updateMyProfile(_id, updateInfo);
    sendResponse(res, {
      message: "User's information retrieved successfully",
      data: { ...result, password: undefined, role: undefined },
    });
  } catch (error) {
    next(error);
  }
};
const deleteAUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result: TUser | null = await userService.deleteUserDB(id);
    sendResponse(res, {
      message: "Uers deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.user as JwtPayload;
    const result = await userService.getAUserDB(_id);

    sendResponse(res, {
      message: "User's information retrieved successfully",
      data: { ...result, password: undefined, role: undefined },
    });
  } catch (error) {
    next(error);
  }
};

const userController = {
  getAllUser,
  createUser,
  getAUser,
  updateAUser,
  deleteAUser,
  getMyProfile,
  updateMyProfile,
};
export default userController;
