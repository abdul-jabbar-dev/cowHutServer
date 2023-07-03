"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodValidator = exports.createUserZodValidator = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserZodValidator = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string(),
        role: zod_1.default.enum(["seller", "buyer"]),
        password: zod_1.default.union([zod_1.default.string(), zod_1.default.number()]),
        name: zod_1.default.object({
            firstName: zod_1.default.string().trim(),
            lastName: zod_1.default.string().trim(),
        }),
        address: zod_1.default.string().trim(),
        budget: zod_1.default.number().min(0, "Negative budget not allowed"),
        income: zod_1.default.number().min(0, "Negative income not allowed"),
    }),
});
exports.updateUserZodValidator = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string().optional(),
        password: zod_1.default.union([zod_1.default.string(), zod_1.default.number()]).optional(),
        name: zod_1.default.object({
            firstName: zod_1.default.string().trim().optional(),
            lastName: zod_1.default.string().trim().optional(),
        }),
        address: zod_1.default.string().trim().optional(),
    }),
});
