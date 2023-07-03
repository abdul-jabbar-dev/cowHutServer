import { Schema, model } from "mongoose";
import { TUser, TUserMethorts } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
const userSchema = new Schema<TUser, TUserMethorts>(
  {
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
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
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["seller", "buyer"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.static(
  "matchPassword",
  async function (givenPassword: string, storedPassword: string) {
    return await bcrypt.compare(givenPassword, storedPassword);
  }
);
userSchema.static("passwordHash", async function (givenPassword: string) {
  return await bcrypt.hash(givenPassword, config.SALT);
});
const USER = model<TUser, TUserMethorts>("user", userSchema);
export default USER;
