import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }
  const SECRET_KEY = process.env.SECRET_KEY
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err ) {

    }
  })

    // Add the decoded user ID to the request object
  next();
};
