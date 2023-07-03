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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cow_model_1 = __importDefault(require("./cow.model"));
const getAllCowDB = (pagination, filter, searchObj) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = searchObj, fields = __rest(searchObj, ["searchTerm"]);
    const { sortBy, sortOrder, maxPrice, minPrice } = filter;
    const { skip, limit, page } = pagination;
    let search;
    const searchFi = ["location", "breed", "category"];
    if (minPrice) {
        search = [{ price: { $gte: minPrice } }];
    }
    if (maxPrice) {
        if (search) {
            search = [...search, { price: { $lte: maxPrice } }];
        }
        else {
            search = [{ price: { $lte: maxPrice } }];
        }
    }
    if (searchTerm) {
        search = [
            {
                $or: searchFi.map((f) => {
                    return {
                        [f]: { $regex: searchTerm, $options: "i" },
                    };
                }),
            },
        ];
    }
    if (fields) {
        if (search) {
            search = [...search, ...Array(fields)];
        }
        else
            search = [...Array(fields)];
    }
    const result = yield cow_model_1.default.find({ $and: search })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean();
    const total = yield cow_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getACowDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findOne({ _id: id });
    return result;
});
const createACowDB = (cowDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.create(cowDetails);
    return result;
});
const deleteACowDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndDelete(id);
    return result;
});
const updateACowDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const cowService = {
    getAllCowDB,
    getACowDB,
    createACowDB,
    deleteACowDB,
    updateACowDB,
};
exports.default = cowService;
