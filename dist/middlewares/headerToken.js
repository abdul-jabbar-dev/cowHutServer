"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headerToken = () => (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        next("Token require");
    }
    token = token.split(" ")[1];
    res.cookie("refreshToken", token, { httpOnly: true });
    next();
};
exports.default = headerToken;
