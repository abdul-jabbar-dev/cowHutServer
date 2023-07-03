import { Model } from "mongoose";

export type TUser = {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: Number;
  income: Number;
};
export interface TUserMethorts extends Model<TUser> {
  matchPassword(
    givenPassword: string,
    storedPassword: string
  ): Promise<Boolean>;
  passwordHash(givenPassword: string): Promise<string>;
}
