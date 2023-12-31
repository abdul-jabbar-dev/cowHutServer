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
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createAOrderDB = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cow = yield cow_model_1.default.findById(cowId).session(session);
        if (!cow) {
            throw new Error(cowId + " This cow does not exist!!");
        }
        if (cow.label === "sold out") {
            throw new Error("The product is already sold out!");
        }
        const buyer = yield user_model_1.default.findById(buyerId).session(session);
        if (!buyer) {
            throw new Error(buyerId + " this user does not exist!");
        }
        if (Number(buyer.budget) < 1) {
            throw new Error(`Insufficient balance! Your current balance is ${buyer.budget} taka`);
        }
        if (buyer.budget < cow.price) {
            const moreBalance = Number(cow.price) - Number(buyer.budget);
            throw new Error(`Insufficient balance! Please add ${moreBalance} taka to your account for the purchase to be completed. Your current balance is ${buyer.budget} taka`);
        }
        const seller = yield user_model_1.default.findById(cow.seller).session(session);
        if (!seller) {
            throw new Error("Internal server error");
        }
        // Buying process
        cow.label = "sold out";
        buyer.budget = Number(buyer.budget) - Number(cow.price);
        seller.income = Number(seller.income) + Number(cow.price);
        yield cow.save({ session, validateBeforeSave: true });
        yield buyer.save({ session, validateBeforeSave: true });
        yield seller.save({ session, validateBeforeSave: true });
        const orderDetails = {
            buyer: buyer._id,
            cow: cow._id,
            price: cow.price,
            seller: seller._id,
        };
        const confirmOrder = yield order_model_1.default.create([orderDetails], { session });
        if (!confirmOrder) {
            throw new Error("Internal server error! Order not approved");
        }
        yield session.commitTransaction();
        return confirmOrder;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getAllOrderDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.default.find();
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
});
const orderService = { createAOrderDB, getAllOrderDB };
exports.default = orderService;
