import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import createToken from "../../../utils/jwt/createToken";
import { TLogin } from "../admin/admin.interface";
import USER from "../user/user.model";
import ADMIN from "../admin/admin.model";

const loginUser = async (loginInfo: TLogin) => {
  try {
    const isExist = await USER.findOne({ phoneNumber: loginInfo.phoneNumber }).lean();  
    if (!isExist) {
      throw "Invalid user";
    }

    const matchPass = await USER.matchPassword(
      loginInfo.password,
      isExist.password
    );
    if (!matchPass) {
      throw "Incorrect password";
    }
    const refreshToken = createToken(
      { _id: isExist._id, role: isExist.role },
      config.jwt.REFRESH as Secret,
      config.jwt.REFRESH_EXPIRE_IN as string
    );
    const accessToken = createToken(
      { _id: isExist._id, role: isExist.role },
      config.jwt.SECRET as Secret,
      config.jwt.SECRET_EXPIRE_IN as string
    );
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};
const getRefreshTokenDB = async (loginInfo: JwtPayload) => {
  try {
    let isExist;
    if (loginInfo.role === "admin") {
      isExist = await ADMIN.findOne({ _id: loginInfo._id });
    } else {
      isExist = await USER.findOne({ _id: loginInfo._id });
    }
    if (!isExist) {
      throw "Invalid user";
    }
    const refreshToken = createToken(
      { _id: isExist._id, role: isExist.role },
      config.jwt.REFRESH as Secret,
      config.jwt.REFRESH_EXPIRE_IN as string
    );
    const accessToken = createToken(
      { _id: isExist._id, role: isExist.role },
      config.jwt.SECRET as Secret,
      config.jwt.SECRET_EXPIRE_IN as string
    );
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};
export const AuthService = {
  loginUser,
  getRefreshTokenDB,
};
