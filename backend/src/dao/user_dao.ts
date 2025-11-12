import { UserModel } from "../models/user_model.js";
import type { IUser } from "../models/user_model.js";

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = new UserModel({ name, email, password });
  return await user.save();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email }).select("+password");
};

export const findUserById = async (userId: string): Promise<IUser | null> => {
  return await UserModel.findById(userId);
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await UserModel.find().select("-password");
};

export const updateUser = async (
  userId: string,
  updates: Partial<IUser>
): Promise<IUser | null> => {
  return await UserModel.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  const result = await UserModel.findByIdAndDelete(userId);
  return !!result;
};
