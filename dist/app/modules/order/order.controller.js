"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("./order.service"));
const sendResponse_1 = __importDefault(require("../../../global/sendResponse"));
const createAOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cowId = req.body.cow;
        const buyerId = req.body.buyer;
        const result = yield order_service_1.default.createAOrderDB(cowId, buyerId);
        console.log(result);
        (0, sendResponse_1.default)(res, {
            message: "Orders retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield order_service_1.default.getAllOrderDB(user);
        (0, sendResponse_1.default)(res, {
            message: "Orders retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user;
        const result = yield order_service_1.default.getAOrderDB(id, user);
        (0, sendResponse_1.default)(res, {
            message: "Order information retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const orderController = { createAOrder, getAllOrder, getAOrder };
exports.default = orderController;
