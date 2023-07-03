"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler_1 = __importDefault(require("../utils/handleErrors/zodErrorHandler"));
const castErrorHandler_1 = __importDefault(require("../utils/handleErrors/castErrorHandler"));
const validationErrorHandler_1 = __importDefault(require("../utils/handleErrors/validationErrorHandler"));
const globalError = (err, req, res, next) => {
    const error = {
        success: "False",
        message: "",
        errorMessages: [],
        stack: "",
        statusCode: 400,
    };
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const { message, stack, errorMessages, statusCode } = (0, validationErrorHandler_1.default)(err);
        error.message = message;
        error.stack = stack;
        error.errorMessages = errorMessages;
        error.statusCode = statusCode;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ZodError") {
        const { message, stack, errorMessages, statusCode } = (0, zodErrorHandler_1.default)(err);
        error.message = message;
        error.stack = stack;
        error.errorMessages = errorMessages;
        error.statusCode = statusCode;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const { message, stack, errorMessages, statusCode } = (0, castErrorHandler_1.default)(err);
        error.message = message;
        error.stack = stack;
        error.errorMessages = errorMessages;
        error.statusCode = statusCode;
    }
    else if (err instanceof Error) {
        error.message = err.message;
        error.errorMessages.push({ message: err.message, path: "" });
    }
    res.status(error.statusCode || 400).send(error);
};
exports.default = globalError;
