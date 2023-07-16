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
const user_model_1 = __importDefault(require("./user.model"));
const getAllUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.find();
    return data;
});
const getAUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findById(id);
    return data;
});
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.create(payload);
    return data;
});
const updateUserDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return data;
});
const deleteUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findOneAndDelete({ _id: id });
    return data;
});
const userService = {
    getAllUserDB,
    createUserDB,
    getAUserDB,
    updateUserDB,
    deleteUserDB,
};
exports.default = userService;
