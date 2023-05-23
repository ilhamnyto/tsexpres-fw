import mongoose from "mongoose";
import { CreateUserRequest } from "../schema/user";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  location: { type: String },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  password: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date().toLocaleDateString() },
  updatedAt: { type: Date },
});

export const UserModel = mongoose.model("User", UserSchema);

export const createUser = (values: CreateUserRequest) =>
  new UserModel(values).save();
