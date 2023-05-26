import express from "express";
import {
  CustomError,
  UpdateUserRequest,
  DataResponse,
  UpdatePasswordRequest,
  CustomRequest,
} from "../schema";
import {
  allUserServices,
  getUserByUsernameServices,
  myProfileServices,
  searchUserServices,
  updatePasswordServices,
  updateProfileServices,
} from "../services/users";

export const allUserController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const users = await allUserServices();

    const resp: DataResponse = {
      code: 203,
      data: {
        users,
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

export const userByUsernameController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const user = await getUserByUsernameServices(req.params.username);

    const resp: DataResponse = {
      code: 203,
      data: {
        user,
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

export const searchUserController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const query = req.query.query;

    if (typeof query === "string") {
      const users = await searchUserServices(query);
      const resp: DataResponse = {
        code: 203,
        data: {
          users,
        },
      };

      return res.status(resp.code).json(resp);
    } else {
      throw new Error("Wrong search query.");
    }
  } catch (error) {
    const custErr: CustomError = {
      code: 500,
      message: "INTERNAL SERVER ERROR",
      additionalInfo: error.message,
    };

    return res.status(custErr.code).json(custErr);
  }
};

export const myProfileController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const user = await myProfileServices(req.userId);
    const resp: DataResponse = {
      code: 203,
      data: {
        user,
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

export const updateProfileController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const updateReq: UpdateUserRequest = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      phoneNumber: req.body.phone_number,
      location: req.body.location,
    };

    await updateProfileServices(req.userId, updateReq);
    const resp: DataResponse = {
      code: 203,
      data: {
        message: "Profile updated successfully.",
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

export const updatePasswordController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const updateReq: UpdatePasswordRequest = {
      password: req.body.password,
      confirmPassword: req.body.confirm_password,
    };

    await updatePasswordServices(req.userId, updateReq);
    const resp: DataResponse = {
      code: 203,
      data: {
        message: "Password updated successfully.",
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
