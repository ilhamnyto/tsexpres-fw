import { hashPassword, validatePhoneNumber } from "../utils";
import {
  getAllUser,
  getUserById,
  getUserByUsername,
  searchUserByUsernameOrEmail,
  updatePassword,
  updateProfile,
} from "../db/users";
import { UpdatePasswordRequest, UpdateUserRequest } from "../schema/user";

export const allUserServices = async () => {
  try {
    const users = await getAllUser();

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByUsernameServices = async (username: string) => {
  try {
    const user = await getUserByUsername(username);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchUserServices = async (query: string) => {
  try {
    const result = await searchUserByUsernameOrEmail(query);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const myProfileServices = async (id: string) => {
  try {
    const user = await getUserById(id);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProfileServices = async (
  id: string,
  req: UpdateUserRequest
) => {
  try {
    if (!req.firstName || !req.lastName || !req.location || !req.phoneNumber) {
      throw new Error("Field cant be empty");
    } else if (req.firstName.length < 2) {
      throw new Error("First name should have at least 2 characters.");
    } else if (req.lastName.length < 2) {
      throw new Error("Last name should have at least 2 characters.");
    } else if (!validatePhoneNumber(req.phoneNumber)) {
      throw new Error("Incorrect phone number");
    } else if (req.location.length < 2) {
      throw new Error("Location should have at least 2 characters.");
    }

    req.updatedAt = new Date();

    await updateProfile(id, req);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePasswordServices = async (
  id: string,
  req: UpdatePasswordRequest
) => {
  try {
    if (req.password != req.confirmPassword) {
      throw new Error("Password didnt match.");
    } else if (req.password.length < 8 || req.confirmPassword.length < 8) {
      throw new Error("Password should have at least 8 characters.");
    }

    const user = await getUserById(id).select("+password +salt -_id -__v");

    const hashedPassword = hashPassword(user.salt, req.password);

    if (hashedPassword === user.password) {
      throw new Error("You cant use the same password as before");
    }

    req.updatedAt = new Date();

    await updatePassword(id, hashedPassword, req.updatedAt);
  } catch (error) {
    throw new Error(error.message);
  }
};
