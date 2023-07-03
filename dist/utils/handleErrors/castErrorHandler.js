"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const castErrorHandler = (err) => {
    let error = {
        errorMessages: [],
        message: err.name,
        stack: err.stack || undefined,
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    };
    if (err.message || err.path) {
        error.errorMessages.push({
            path: err.path,
            message: err.message,
        });
    }
    return error;
};
exports.default = castErrorHandler;
