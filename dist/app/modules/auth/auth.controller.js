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
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../../global/sendResponse"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInfo = req.body;
        const { accessToken, refreshToken } = yield auth_service_1.AuthService.loginUser(loginInfo);
        const cookieOptions = {
            httpOnly: true,
        };
        res.cookie("refreshToken", refreshToken, cookieOptions);
        (0, sendResponse_1.default)(res, {
            data: { accessToken },
            message: "User logged in successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginInfo = req.user;
        if (!loginInfo) {
            throw "Invalid token";
        }
        const { accessToken, refreshToken } = yield auth_service_1.AuthService.getRefreshTokenDB(loginInfo);
        const cookieOptions = {
            httpOnly: true,
        };
        res.cookie("refreshToken", refreshToken, cookieOptions);
        (0, sendResponse_1.default)(res, {
            data: { accessToken },
            message: "New access token generated successfully !",
        });
    }
    catch (error) {
        next(error);
    }
});
const authController = { loginUser, refreshToken };
exports.default = authController;
