"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zodValidation_1 = __importDefault(require("../../../middlewares/zodValidation"));
const admin_zodValidate_1 = require("./admin.zodValidate");
const admin_controller_1 = __importDefault(require("./admin.controller"));
const adminRoute = (0, express_1.Router)();
adminRoute.post("/create-admin", (0, zodValidation_1.default)(admin_zodValidate_1.createAdminZodValidator), admin_controller_1.default.createAdmin);
adminRoute.post("/login", (0, zodValidation_1.default)(admin_zodValidate_1.loginAdminZodValidator), admin_controller_1.default.loginAdmin);
exports.default = adminRoute;
