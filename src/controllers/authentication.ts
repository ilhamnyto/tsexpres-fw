import express from "express";

import { CreateUserRequest } from "../schema/user";
import { DataResponse } from "../schema/response";
import { CustomError } from "../schema/error";
import { registerServices } from "../services/authentication";


export const register = async (req: express.Request, res: express.Response) => {
  try {
    const createUserReq: CreateUserRequest = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    await registerServices(createUserReq);

    const resp: DataResponse = {
      code: 203,
      data: {
        message: "User created Successfully",
      },
    };

    return res.status(resp.code).json(resp);
  } catch (error) {
    const custErr: CustomError = {
      code: 500,
      message: "INTERNAL SERVER ERROR",
      additionalInfo: error.message,
    };

    return res.status(custErr.code).json(custErr);
  }
};
