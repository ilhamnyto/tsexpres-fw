import express from "express";

import {
  loginController,
  registerController,
} from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/api/v1/auth/register", registerController);
  router.post("/api/v1/auth/login", loginController);
};
