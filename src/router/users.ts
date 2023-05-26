import express from "express";

import {
  allUserController,
  myProfileController,
  searchUserController,
  updatePasswordController,
  updateProfileController,  
  userByUsernameController,
} from "../controllers/users";
import { authenticateToken } from "../middleware";

export default (router: express.Router) => {
  router.use(authenticateToken);
  router.get("/api/v1/users", allUserController);
  router.get("/api/v1/users/search", searchUserController);
  router.get("/api/v1/users/me", myProfileController);
  router.get("/api/v1/users/:username", userByUsernameController);
  router.put("/api/v1/users/profile/update", updateProfileController);
  router.put("/api/v1/users/profile/update_password", updatePasswordController);
};
