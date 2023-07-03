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
const user_service_1 = __importDefault(require("./user.service"));
const sendResponse_1 = __importDefault(require("../../../global/sendResponse"));
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.getAllUserDB();
        (0, sendResponse_1.default)(res, {
            message: "Users retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield user_service_1.default.getAUserDB(id);
        (0, sendResponse_1.default)(res, {
            message: "Users retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.createUserDB(req.body);
        (0, sendResponse_1.default)(res, {
            message: "Users created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateAUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updateInfo = req.body;
        const result = yield user_service_1.default.updateUserDB(id, updateInfo);
        (0, sendResponse_1.default)(res, {
            message: "User updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteAUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield user_service_1.default.deleteUserDB(id);
        (0, sendResponse_1.default)(res, {
            message: "Uers deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const userController = {
    getAllUser,
    createUser,
    getAUser,
    updateAUser,
    deleteAUser,
};
exports.default = userController;
