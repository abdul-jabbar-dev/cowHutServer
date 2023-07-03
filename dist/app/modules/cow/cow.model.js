"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowKeys = void 0;
const cow_constant_1 = require("./cow.constant");
const mongoose_1 = require("mongoose");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: cow_constant_1.CowCategory,
        required: true,
    },
    label: {
        type: String,
        enum: cow_constant_1.CowLabel,
        required: true,
    },
    location: {
        type: String,
        enum: cow_constant_1.CowLocation,
        required: true,
    },
    price: {
        type: Number,
        min: [0, "Negative price not acceptable"],
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    weight: {
        type: Number,
        min: [0, "Negative weight not acceptable"],
        required: [true, "Weight(kilograms) is required"],
    },
}, {
    timestamps: true,
});
const COW = (0, mongoose_1.model)("cow", cowSchema);
exports.cowKeys = Object.keys(COW.schema.obj);
exports.default = COW;
