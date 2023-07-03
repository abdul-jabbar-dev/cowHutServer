"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config"));
const createToken_1 = __importDefault(require("../../../utils/jwt/createToken"));
const user_model_1 = __importDefault(require("../user/user.model"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const loginUser = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield user_model_1.default.findOne({ phoneNumber: loginInfo.phoneNumber }).lean();
        if (!isExist) {
            throw "Invalid user";
        }
        const matchPass = yield user_model_1.default.matchPassword(loginInfo.password, isExist.password);
        if (!matchPass) {
            throw "Incorrect password";
        }
        const refreshToken = (0, createToken_1.default)({ _id: isExist._id, role: isExist.role }, config_1.default.jwt.REFRESH, config_1.default.jwt.REFRESH_EXPIRE_IN);
        const accessToken = (0, createToken_1.default)({ _id: isExist._id, role: isExist.role }, config_1.default.jwt.SECRET, config_1.default.jwt.SECRET_EXPIRE_IN);
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        throw error;
    }
});
const getRefreshTokenDB = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isExist;
        if (loginInfo.role === "admin") {
            isExist = yield admin_model_1.default.findOne({ _id: loginInfo._id });
        }
        else {
            isExist = yield user_model_1.default.findOne({ _id: loginInfo._id });
        }
        if (!isExist) {
            throw "Invalid user";
        }
        const refreshToken = (0, createToken_1.default)({ _id: isExist._id, role: isExist.role }, config_1.default.jwt.REFRESH, config_1.default.jwt.REFRESH_EXPIRE_IN);
        const accessToken = (0, createToken_1.default)({ _id: isExist._id, role: isExist.role }, config_1.default.jwt.SECRET, config_1.default.jwt.SECRET_EXPIRE_IN);
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.AuthService = {
    loginUser,
    getRefreshTokenDB,
};
