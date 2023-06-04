import express from "express";

import { createPostController, getAllPostsController, getSpecificPostController } from "../controllers/posts";
import { authenticateToken } from "../middleware";

export default (router: express.Router) => {
  router.use(authenticateToken);
  router.post("/api/v1/posts/create", createPostController);
  router.get("/api/v1/posts", getAllPostsController);
  router.get("/api/v1/posts/:post_id", getSpecificPostController);
};
