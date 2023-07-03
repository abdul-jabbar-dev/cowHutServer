"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCowZOdValidator = exports.createCowZOdValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const cow_constant_1 = require("./cow.constant");
exports.createCowZOdValidator = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        age: zod_1.default.number().min(0, "Age must be positive number"),
        price: zod_1.default.number().min(0, "Price must be positive number"),
        location: zod_1.default.enum(cow_constant_1.CowLocation),
        breed: zod_1.default.string(),
        weight: zod_1.default.number().min(0, "Weight must be positive number in kilograms"),
        label: zod_1.default.string().refine((value) => value === "for sale", {
            message: "Label must be 'for sale'",
        }),
        category: zod_1.default.enum(cow_constant_1.CowCategory),
        seller: zod_1.default.string(),
    }),
});
exports.updateCowZOdValidator = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        age: zod_1.default.number().min(0, "Age must be positive number").optional(),
        price: zod_1.default.number().min(0, "Price must be positive number").optional(),
        location: zod_1.default.enum(cow_constant_1.CowLocation).optional(),
        breed: zod_1.default.string().optional(),
        weight: zod_1.default
            .number()
            .min(0, "Weight must be positive number in kilograms")
            .optional(),
        label: zod_1.default.enum(cow_constant_1.CowLabel).optional(),
        category: zod_1.default.enum(cow_constant_1.CowCategory).optional(),
    }),
});
