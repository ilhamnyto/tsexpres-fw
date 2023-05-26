import crypto from "crypto";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config();

const SECRET = process.env.SECRET_KEY;

export const hashPassword = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join(":"))
    .update(SECRET)
    .digest("hex");
};

export const generateSalt = (): string =>
  crypto.randomBytes(128).toString("base64");

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const regex = /^\+[1-9]\d{1,14}$/;

  return regex.test(phoneNumber);
};

export const generateToken = (userId: string): string => {
  const SECRET_KEY = process.env.JWT_SECRET;

  return jwt.sign({ userId}, SECRET_KEY, {
    expiresIn: "10m",
  });
};
