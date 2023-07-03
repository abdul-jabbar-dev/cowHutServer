"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, body, meta) => {
    const response = {
        message: body.message,
        statusCode: body.statusCode || 200,
        success: body.success || true,
        data: body.data || undefined,
        meta: meta || undefined,
    };
    res.send(response);
};
exports.default = sendResponse;
