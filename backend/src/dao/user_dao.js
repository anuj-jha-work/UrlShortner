import { UserModel } from "../models/user_model.js";
export const createUser = async (name, email, password) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const user = new UserModel({ name, email, password });
    return await user.save();
};
export const findUserByEmail = async (email) => {
    return await UserModel.findOne({ email }).select("+password");
};
export const findUserById = async (userId) => {
    return await UserModel.findById(userId);
};
export const getAllUsers = async () => {
    return await UserModel.find().select("-password");
};
export const updateUser = async (userId, updates) => {
    return await UserModel.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true }).select("-password");
};
export const deleteUser = async (userId) => {
    const result = await UserModel.findByIdAndDelete(userId);
    return !!result;
};
