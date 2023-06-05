import express from "express";

import { createPostController, getAllPostsController, getSpecificPostController, searchPostController, userMyPostController } from "../controllers/posts";
import { authenticateToken } from "../middleware";

export default (router: express.Router) => {
  router.use(authenticateToken);
  router.post("/api/v1/posts/create", createPostController);
  router.get("/api/v1/posts", getAllPostsController);
  router.get("/api/v1/posts/search", searchPostController);
  router.get("/api/v1/posts/me", userMyPostController);
  router.get("/api/v1/posts/:keyword", getSpecificPostController);
};
