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
const config_1 = __importDefault(require("../../../config"));
const createToken_1 = __importDefault(require("../../../utils/jwt/createToken"));
const admin_model_1 = __importDefault(require("./admin.model"));
const createAdminDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (yield admin_model_1.default.create(payload)).toObject();
        return result;
    }
    catch (error) {
        throw error;
    }
});
const loginAdminDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield admin_model_1.default.findOne({ phoneNumber: payload.phoneNumber });
        if (!result) {
            throw "Invalid user";
        }
        const match = yield admin_model_1.default.matchPassword(payload.password, result.password);
        if (!match) {
            throw "Password incorrect";
        }
        const refreshToken = (0, createToken_1.default)({ _id: result._id, role: result.role }, config_1.default.jwt.REFRESH, config_1.default.jwt.REFRESH_EXPIRE_IN);
        const accessToken = (0, createToken_1.default)({ _id: result._id, role: result.role }, config_1.default.jwt.SECRET, config_1.default.jwt.SECRET_EXPIRE_IN);
        return {
            refreshToken,
            accessToken,
        };
    }
    catch (error) {
        throw error;
    }
});
const adminService = {
    createAdminDB,
    loginAdminDB,
};
exports.default = adminService;
