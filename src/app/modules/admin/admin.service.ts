import { Secret } from "jsonwebtoken";
import config from "../../../config";
import createToken from "../../../utils/jwt/createToken";
import TAdmin, { TLogin } from "./admin.interface";
import ADMIN from "./admin.model";

const createAdminDB = async (payload: TAdmin) => {
  try {
    const result = (await ADMIN.create(payload)).toObject();
    return result;
  } catch (error) {
    throw error;
  }
};
const loginAdminDB = async (payload: TLogin) => {
  try {
    const result = await ADMIN.findOne({ phoneNumber: payload.phoneNumber });
    if (!result) {
      throw "Invalid user";
    }
    const match = await ADMIN.matchPassword(payload.password, result.password);
    if (!match) {
      throw "Password incorrect";
    }
    const refreshToken = createToken(
      { _id: result._id, role: result.role },
      config.jwt.REFRESH as Secret,
      config.jwt.REFRESH_EXPIRE_IN as string
    );
    const accessToken = createToken(
      { _id: result._id, role: result.role },
      config.jwt.SECRET as Secret,
      config.jwt.SECRET_EXPIRE_IN as string
    );
    return {
      refreshToken,
      accessToken,
    };
  } catch (error) {
    throw error;
  }
};
const adminService = {
  createAdminDB,
  loginAdminDB,
};
export default adminService;
