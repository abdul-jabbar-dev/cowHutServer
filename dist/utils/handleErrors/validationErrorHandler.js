"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const ValidationErrorHandler = (err) => {
    let error = {
        errorMessages: [],
        message: err.name,
        stack: err.stack || undefined,
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    };
    if (err.errors) {
        error.errorMessages = Object.keys(err.errors).map((p) => {
            return { path: p, message: err.errors[p].message };
        });
    }
    return error;
};
exports.default = ValidationErrorHandler;
