import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import USER from "./user.model";
import config from "../../../config";

const getAllUserDB = async (): Promise<TUser[]> => {
  const data: TUser[] = await USER.find({}, { password: 0 });
  return data;
};

const getAUserDB = async (id: String) => {
  const data = await USER.findById(id, { password: 0 });
  return data?.toObject();
};

const createUserDB = async (payload: TUser) => {
  payload.password = await USER.passwordHash(payload.password);
  const data = (await USER.create(payload)).toObject();

  return data;
};
const updateUserDB = async (
  id: string,
  payload: Partial<TUser>
): Promise<TUser | null> => {
  const data: TUser | null = await USER.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return data;
};

const updateMyProfile = async (_id: string, payload: Partial<TUser>) => {
  const updatedData = { ...payload };

  if (payload.name && Object.keys(payload.name).length > 0) {
    delete updatedData.name;
    Object.keys(payload.name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<TUser>;
      if (payload.name) {
        (updatedData as any)[nameKey] =
          payload?.name[key as keyof typeof payload.name];
      }
    });
  }
  if (payload.password) {
    console.log("update password", payload.password);
    updatedData.password = await bcrypt.hash(payload.password, config.SALT);
  }
  const data: TUser | null = await USER.findOneAndUpdate({ _id }, updatedData, {
    new: true,
  }).lean();
  return data;
};
const deleteUserDB = async (id: string): Promise<TUser | null> => {
  const data: TUser | null = await USER.findOneAndDelete({
    _id: id,
  }) 
  return data;
};

const userService = {
  getAllUserDB,
  createUserDB,
  getAUserDB,
  updateUserDB,
  deleteUserDB,
  updateMyProfile,
};
export default userService;
