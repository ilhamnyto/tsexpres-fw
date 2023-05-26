import express from "express";
import jwt, { JwtPayload, decode } from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomError, CustomRequest } from "../schema";

dotenv.config();

export const authenticateToken = (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const custErr: CustomError = {
      code: 500,
      message: "INTERNAL SERVER ERROR",
      additionalInfo: "token is not found.",
    };

    return res.status(custErr.code).json(custErr);
  }

  try {
    const SECRET_KEY = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    req.userId = decoded.userId;
  } catch (error) {
    const custErr: CustomError = {
      code: 500,
      message: "INTERNAL SERVER ERROR",
      additionalInfo: error.message,
    };

    return res.status(custErr.code).json(custErr);
  }

  next();
};
