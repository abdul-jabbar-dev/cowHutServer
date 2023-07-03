import { Model } from "mongoose";

type TAdmin = {
  phoneNumber: string;
  role: "admin";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};
export interface TAdminMethords extends Model<TAdmin> {
  matchPassword(
    givenPassword: string,
    storedPassword: string
  ): Promise<Boolean>;
}
export type TLogin = { password: string; phoneNumber: string };
export default TAdmin;
