import { Schema, model } from "mongoose";
import TAdmin, { TAdminMethords } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
const AdminSchema = new Schema<TAdmin, TAdminMethords>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      enum: ["admin"],
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);
AdminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, config.SALT);
  next();
});

AdminSchema.static(
  "matchPassword",
  async function (givenPassword: string, storedPassword: string) {
    return await bcrypt.compare(givenPassword, storedPassword);
  }
);
const ADMIN = model<TAdmin, TAdminMethords>("admin", AdminSchema);
export default ADMIN;
