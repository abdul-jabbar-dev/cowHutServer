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
const varifyToken_1 = __importDefault(require("../utils/jwt/varifyToken"));
const config_1 = __importDefault(require("../config"));
const authCheck = (...role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        next("Token required");
    }
    const result = yield (0, varifyToken_1.default)(refreshToken, config_1.default.jwt.REFRESH);
    req.user = result;
    if (role.includes(result.role)) {
        next();
    }
    else {
        next("Invalid user access");
    }
});
exports.default = authCheck;
