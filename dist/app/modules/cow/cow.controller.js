"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cow_service_1 = __importDefault(require("./cow.service"));
const sendResponse_1 = __importDefault(require("../../../global/sendResponse"));
const pickQuery_1 = __importStar(require("../../../utils/sheard/pickQuery"));
const cow_model_1 = require("./cow.model");
const getAllCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagination = (0, pickQuery_1.paginationCalculate)((0, pickQuery_1.default)(req.query, ["limit", "page"]));
        let { maxPrice, minPrice, sortBy, sortOrder, } = (0, pickQuery_1.default)(req.query, ["minPrice", "maxPrice", "sortBy", "sortOrder"]);
        if (!sortBy) {
            sortBy = "createdAt";
        }
        if (!sortOrder) {
            sortOrder = "asc";
        }
        const searchOptions = (0, pickQuery_1.default)(req.query, ["searchTerm", ...cow_model_1.cowKeys]);
        const cows = yield cow_service_1.default.getAllCowDB(pagination, { maxPrice, minPrice, sortBy, sortOrder }, searchOptions);
        (0, sendResponse_1.default)(res, {
            message: "Cows retrieved successfully",
            data: cows.data,
        }, cows.meta);
    }
    catch (error) {
        next(error);
    }
});
const getACow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cows = yield cow_service_1.default.getACowDB(req.params.id);
        (0, sendResponse_1.default)(res, {
            message: "Cows retrieved successfully",
            data: cows,
        });
    }
    catch (error) {
        next(error);
    }
});
const createAllCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cows = yield cow_service_1.default.createACowDB(req.body);
        (0, sendResponse_1.default)(res, {
            message: "Cow created successfully",
            data: cows,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteACow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cows = yield cow_service_1.default.deleteACowDB(req.params.id);
        (0, sendResponse_1.default)(res, {
            message: "Cow deleted successfully",
            data: cows,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateACow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatableData = req.body;
        const cows = yield cow_service_1.default.updateACowDB(id, updatableData);
        (0, sendResponse_1.default)(res, {
            message: "Cow updated successfully",
            data: cows,
        });
    }
    catch (error) {
        next(error);
    }
});
const cowController = {
    getAllCow,
    getACow,
    createAllCow,
    deleteACow,
    updateACow,
};
exports.default = cowController;
