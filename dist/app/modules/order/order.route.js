"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("./order.controller"));
const zodValidation_1 = __importDefault(require("../../../middlewares/zodValidation"));
const order_zodValidator_1 = require("./order.zodValidator");
const ordersRoute = (0, express_1.Router)();
ordersRoute.post("/", (0, zodValidation_1.default)(order_zodValidator_1.createOrderZodValidator), order_controller_1.default.createAOrder);
ordersRoute.get("/", order_controller_1.default.getAllOrder);
exports.default = ordersRoute;
