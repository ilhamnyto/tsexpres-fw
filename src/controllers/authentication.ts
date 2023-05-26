import express from "express";

import {
  CreateUserRequest,
  UserLoginRequest,
  DataResponse,
  CustomError,
} from "../schema";

import { loginServices, registerServices } from "../services/authentication";

export const registerController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const createRequest: CreateUserRequest = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      salt: "",
    };
    await registerServices(createRequest);

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

export const loginController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const loginRequest: UserLoginRequest = {
      username: req.body.username,
      password: req.body.password,
    };

    const token = await loginServices(loginRequest);

    const resp: DataResponse = {
      code: 200,
      data: {
        token,
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
