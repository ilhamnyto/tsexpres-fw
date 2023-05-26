import express from "express";
import {
  CreatePostRequest,
  CustomRequest,
  CustomError,
  DataResponse,
} from "../schema";
import {
  createPostServices,
  getAllPostServices,
  getPostByIdServices,
  getUserPostServices,
} from "../services/posts";

export const createPostController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const createReq: CreatePostRequest = {
      user: req.userId,
      body: req.body.body,
    };

    await createPostServices(createReq);

    const resp: DataResponse = {
      code: 203,
      data: {
        message: "Post created Successfully",
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

export const getAllPostsController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const posts = await getAllPostServices();

    const resp: DataResponse = {
      code: 203,
      data: {
        posts,
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

export const getSpecificPostController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const postId = req.params.post_id;
    let posts;

    if (postId.charAt(0) == "@") {
      const username = postId.substring(1);
      posts = await getUserPostServices(username);
    } else {
      posts = await getPostByIdServices(postId);
    }

    const resp: DataResponse = {
      code: 203,
      data: {
        posts,
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
