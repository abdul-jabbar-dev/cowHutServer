"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cow_controller_1 = __importDefault(require("./cow.controller"));
const zodValidation_1 = __importDefault(require("../../../middlewares/zodValidation"));
const cow_zodValidator_1 = require("./cow.zodValidator");
const authCheck_1 = __importDefault(require("../../../middlewares/authCheck"));
const RoleEnums_1 = __importDefault(require("../../../types/Enums/RoleEnums"));
const cowRoute = (0, express_1.Router)();
cowRoute.get("/", (0, authCheck_1.default)(RoleEnums_1.default.SELLER, RoleEnums_1.default.SELLER, RoleEnums_1.default.ADMIN), cow_controller_1.default.getAllCow);
cowRoute.post("/", (0, authCheck_1.default)(RoleEnums_1.default.SELLER), (0, zodValidation_1.default)(cow_zodValidator_1.createCowZOdValidator), cow_controller_1.default.createAllCow);
cowRoute.get("/:id", (0, authCheck_1.default)(RoleEnums_1.default.SELLER, RoleEnums_1.default.SELLER, RoleEnums_1.default.ADMIN), cow_controller_1.default.getACow);
cowRoute.delete("/:id", (0, authCheck_1.default)(RoleEnums_1.default.SELLER), cow_controller_1.default.deleteACow);
cowRoute.patch("/:id", (0, authCheck_1.default)(RoleEnums_1.default.SELLER), (0, zodValidation_1.default)(cow_zodValidator_1.updateCowZOdValidator), cow_controller_1.default.updateACow);
exports.default = cowRoute;
