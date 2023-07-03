"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const zodValidation_1 = __importDefault(require("../../../middlewares/zodValidation"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const authCheck_1 = __importDefault(require("../../../middlewares/authCheck"));
const RoleEnums_1 = __importDefault(require("../../../types/Enums/RoleEnums"));
const authRoutes = express_1.default.Router();
authRoutes.post("/login", (0, zodValidation_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.default.loginUser);
authRoutes.post("/refresh-token", (0, zodValidation_1.default)(auth_validation_1.AuthValidation.refreshTokenZodSchema), (0, authCheck_1.default)(RoleEnums_1.default.BUYER, RoleEnums_1.default.SELLER, RoleEnums_1.default.ADMIN), auth_controller_1.default.refreshToken);
exports.default = authRoutes;
