import mongoose from "mongoose";
import { CreateUserRequest, UpdateUserRequest } from "../schema";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  location: { type: String, default: "" },
  password: { type: String, required: true, select: false },
  salt: { type: String, select: false },
  createdAt: { type: Date, default: () => new Date().toUTCString() },
  updatedAt: { type: Date, default: null },
});

export const UserModel = mongoose.model("User", UserSchema);

export const createUser = (values: CreateUserRequest) =>
  new UserModel(values).save();

export const checkUserByUsernameOrEmail = (username: string, email: string) =>
  UserModel.findOne({ $or: [{ username }, { email }] });

export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });

export const getAllUser = () => UserModel.find({}, { _id: 0, __v: 0 });

export const searchUserByUsernameOrEmail = (query: string) =>
  UserModel.find(
    {
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    },
    { _id: 0, __v: 0 }
  );

export const getUserById = (id: string) => UserModel.findById(id);

export const updateProfile = (id: string, values: UpdateUserRequest) =>
  UserModel.findByIdAndUpdate(id, values);

export const updatePassword = (id: string, password: string, updatedAt: Date) =>
  UserModel.findByIdAndUpdate(id, { password, updatedAt });
