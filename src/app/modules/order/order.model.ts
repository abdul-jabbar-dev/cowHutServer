import { Schema, model } from "mongoose";
import TOrder from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: "cow",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: { type: Number, required: true },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const ORDER = model("order", orderSchema);
export default ORDER;
