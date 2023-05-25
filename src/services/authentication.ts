import { CreateUserRequest, UserLoginRequest } from "../schema/user";
import {
  createUser,
  checkUserByUsernameOrEmail,
  getUserByUsername,
} from "../db/users";
import { generateSalt, hashPassword } from "../utils";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const registerServices = async (req: CreateUserRequest) => {
  try {
    if (!req.email || !req.password || !req.username) {
      throw new Error("Field cant be empty.");
    } else if (!req.email.includes("@")) {
      throw new Error("Email is not appropriate.");
    } else if (!req.username || req.username.length < 6) {
      throw new Error("Username should have at least 6 characters.");
    } else if (!req.password || req.password.length < 8) {
      throw new Error("Password should have at least 8 characters.");
    }

    const existingUser = await checkUserByUsernameOrEmail(
      req.username,
      req.email
    );

    if (existingUser) {
      throw new Error("Username or Email already been used.");
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(salt, req.password);

    req.password = hashedPassword;
    req.salt = salt;
    await createUser(req);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginServices = async (req: UserLoginRequest) => {
  try {
    if (!req.username || !req.password) {
      throw new Error("Field cannot be empty");
    }

    const user = await getUserByUsername(req.username).select(
      "+password +salt -__v"
    );

    if (!user) {
      throw new Error("Wrong username.");
    }

    const expectedHash = hashPassword(user.salt, req.password);
    if (user.password != expectedHash) {
      throw new Error("Wrong password.");
    }

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "10m",
    });

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};
