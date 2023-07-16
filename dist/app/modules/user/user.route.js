"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const zodValidation_1 = __importDefault(require("../../../middlewares/zodValidation"));
const user_zodValidator_1 = require("./user.zodValidator");
const userRoute = (0, express_1.Router)();
userRoute.get("/", user_controller_1.default.getAllUser);
userRoute.get("/:id", user_controller_1.default.getAUser);
userRoute.patch("/:id", (0, zodValidation_1.default)(user_zodValidator_1.updateUserZodValidator), user_controller_1.default.updateAUser);
userRoute.delete("/:id", user_controller_1.default.deleteAUser);
exports.default = userRoute;
