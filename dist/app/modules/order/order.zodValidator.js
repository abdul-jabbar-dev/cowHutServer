"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderZodValidator = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createOrderZodValidator = zod_1.default.object({
    body: zod_1.default.object({
        buyer: zod_1.default.string().nonempty("Buyer id is required "),
        cow: zod_1.default.string().nonempty("Cow id is required "),
    }),
});
