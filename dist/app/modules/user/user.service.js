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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("./user.model"));
const config_1 = __importDefault(require("../../../config"));
const getAllUserDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.find({}, { password: 0 });
    return data;
});
const getAUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findById(id, { password: 0 });
    return data === null || data === void 0 ? void 0 : data.toObject();
});
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield user_model_1.default.passwordHash(payload.password);
    const data = (yield user_model_1.default.create(payload)).toObject();
    return data;
});
const updateUserDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return data;
});
const updateMyProfile = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = Object.assign({}, payload);
    if (payload.name && Object.keys(payload.name).length > 0) {
        delete updatedData.name;
        Object.keys(payload.name).forEach((key) => {
            const nameKey = `name.${key}`;
            if (payload.name) {
                updatedData[nameKey] =
                    payload === null || payload === void 0 ? void 0 : payload.name[key];
            }
        });
    }
    if (payload.password) {
        console.log("update password", payload.password);
        updatedData.password = yield bcrypt_1.default.hash(payload.password, config_1.default.SALT);
    }
    const data = yield user_model_1.default.findOneAndUpdate({ _id }, updatedData, {
        new: true,
    }).lean();
    return data;
});
const deleteUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.findOneAndDelete({
        _id: id,
    });
    return data;
});
const userService = {
    getAllUserDB,
    createUserDB,
    getAUserDB,
    updateUserDB,
    deleteUserDB,
    updateMyProfile,
};
exports.default = userService;
