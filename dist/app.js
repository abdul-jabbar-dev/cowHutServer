"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const user_controller_1 = __importDefault(require("./app/modules/user/user.controller"));
const GlobalError_1 = __importDefault(require("./middlewares/GlobalError"));
const zodValidation_1 = __importDefault(require("./middlewares/zodValidation"));
const user_zodValidator_1 = require("./app/modules/user/user.zodValidator");
const cow_route_1 = __importDefault(require("./app/modules/cow/cow.route"));
const order_route_1 = __importDefault(require("./app/modules/order/order.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/cows", cow_route_1.default);
app.use("/api/v1/orders", order_route_1.default);
app.post("/api/v1/auth/signup", (0, zodValidation_1.default)(user_zodValidator_1.createUserZodValidator), user_controller_1.default.createUser);
app.get("/", (req, res) => {
    res.send("home");
});
app.use(GlobalError_1.default);
exports.default = app;
