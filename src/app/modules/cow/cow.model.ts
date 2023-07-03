import { CowCategory, CowLabel, CowLocation } from "./cow.constant";
import { TCow } from "./cow.interface";
import { Schema, model } from "mongoose";

const cowSchema = new Schema<TCow>(
  {
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
      enum: CowCategory,
      required: true,
    },
    label: {
      type: String,
      enum: CowLabel,
      required: true,
    },
    location: {
      type: String,
      enum: CowLocation,
      required: true,
    },
    price: {
      type: Number,
      min: [0, "Negative price not acceptable"],
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    weight: {
      type: Number,
      min: [0, "Negative weight not acceptable"],
      required: [true, "Weight(kilograms) is required"],
    },
  },
  {
    timestamps: true,
  }
);
const COW = model("cow", cowSchema);
export const cowKeys = Object.keys(COW.schema.obj);
export default COW;
