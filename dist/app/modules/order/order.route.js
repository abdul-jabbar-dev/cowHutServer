"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("./order.controller"));
const zodValidation_1 = __importDefault(require("../../../middlewares/zodValidation"));
const order_zodValidator_1 = require("./order.zodValidator");
const RoleEnums_1 = __importDefault(require("../../../types/Enums/RoleEnums"));
const authCheck_1 = __importDefault(require("../../../middlewares/authCheck"));
const ordersRoute = (0, express_1.Router)();
ordersRoute.post("/", (0, authCheck_1.default)(RoleEnums_1.default.BUYER), (0, zodValidation_1.default)(order_zodValidator_1.createOrderZodValidator), order_controller_1.default.createAOrder);
ordersRoute.get("/", (0, authCheck_1.default)(RoleEnums_1.default.ADMIN, RoleEnums_1.default.BUYER, RoleEnums_1.default.SELLER), order_controller_1.default.getAllOrder);
ordersRoute.get("/:id", (0, authCheck_1.default)(RoleEnums_1.default.BUYER, RoleEnums_1.default.SELLER, RoleEnums_1.default.ADMIN), order_controller_1.default.getAOrder);
exports.default = ordersRoute;
