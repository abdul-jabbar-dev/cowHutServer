"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (err) => {
    let error = {
        errorMessages: [],
        message: err.name,
        stack: err.stack || undefined,
        statusCode: 400,
    };
    if (err.errors) {
        error.errorMessages = err.errors.map((singleP) => {
            return { path: singleP.path.join("->"), message: singleP.message };
        });
    }
    return error;
};
exports.default = zodErrorHandler;
