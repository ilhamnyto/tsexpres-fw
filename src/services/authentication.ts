import { CreateUserRequest } from "../schema/user";
import { createUser } from "../db/users";

export const registerServices = async (req: CreateUserRequest) => {
  if (!req.email || !req.password || !req.username) {
    throw new Error("Field cant be empty.");
  }
  else if (!req.email.includes('@')) {
    throw new Error("Email is not appropriate.");
  }
  else if (!req.username || req.username.length < 6) {
    throw new Error("Username should have at least 6 characters.");
  }
  else if (!req.password || req.password.length < 8) {
    throw new Error("Password should have at least 8 characters.");
  }

  


  await createUser(req)
};
