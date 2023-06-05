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
  myPostServices,
  searchPostServices,
} from "../services/posts";

export const createPostController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const createReq: CreatePostRequest = {
      user_id: req.userId,
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
    let cursor = req.query.cursor;
    if (typeof cursor != "string") {
      cursor = "";
    }
    const posts = await getAllPostServices(cursor);

    const resp: DataResponse = {
      code: 203,
      data: { posts: posts.data },
      paging: posts.paging,
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
    const keyword = req.params.keyword;
    let cursor = req.query.cursor;
    let posts;

    if (typeof cursor != "string") {
      cursor = "";
    }

    if (keyword.charAt(0) == "@") {
      const username = keyword.substring(1);
      posts = await getUserPostServices(username, cursor);
    } else {
      posts = await getPostByIdServices(keyword);
    }

    const resp: DataResponse = {
      code: posts ? 203 : 404,
      data: { posts: posts.data ? posts.data : posts },
      paging: posts?.paging,
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

export const searchPostController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    let query = req.query.query;
    let cursor = req.query.cursor;

    if (typeof query != "string") {
      query = "";
    }
    if (typeof cursor != "string") {
      cursor = "";
    }

    const posts = await searchPostServices(query, cursor);

    const resp: DataResponse = {
      code: posts ? 203 : 404,
      data: { posts: posts?.data },
      paging: posts?.paging,
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

export const userMyPostController = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    let cursor = req.query.cursor;

    if (typeof cursor != "string") {
      cursor = "";
    }
    
    const posts = await myPostServices(req.userId, cursor);

    const resp: DataResponse = {
      code: posts ? 203 : 404,
      data: { posts: posts?.data },
      paging: posts?.paging,
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
