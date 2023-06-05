import { CreatePostRequest, Paging } from "../schema";
import {
  createPost,
  getAllPost,
  getPostById,
  getPostByUserId,
  getPostByUsername,
  searchPosts,
} from "../repositories/posts";
import moment from "moment";
import { decodePostId, encodePostId } from "../utils";

export const createPostServices = async (req: CreatePostRequest) => {
  try {
    req.createdAt = new Date();
    await createPost(req);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPostServices = async (cursor: string) => {
  try {
    if (cursor != "") {
      cursor = moment
        .utc(new Date(parseInt(cursor) * 1000))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss.SSS");
    }

    const posts = await getAllPost(cursor);

    let paging: Paging;
    if (posts.length > 5) {
      paging = {
        cursor: Math.floor(
          posts[posts.length - 1].created_at.getTime() / 1000
        ).toString(),
        next: true,
      };
    } else {
      paging = {
        cursor: "",
        next: false,
      };
    }

    return {
      data: posts.slice(0, 5).map((el) => {
        el.created_at = moment
          .utc(el.created_at)
          .tz("Asia/Jakarta")
          .format("YYYY-MM-DD HH:mm:ss.SSS");
        return el;
      }),
      paging,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostByIdServices = async (id: string) => {
  try {
    const postId = decodePostId(id).split(":");
    const post = await getPostById(postId[0]);
    post.created_at = moment
      .utc(post.created_at)
      .tz("Asia/Jakarta")
      .format("YYYY-MM-DD HH:mm:ss.SSS");

    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserPostServices = async (username: string, cursor: string) => {
  try {
    if (cursor != "") {
      cursor = moment
        .utc(new Date(parseInt(cursor) * 1000))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss.SSS");
    }

    const posts = await getPostByUsername(username, cursor);

    let paging: Paging;
    if (posts.length > 5) {
      paging = {
        cursor: Math.floor(
          posts[posts.length - 1].created_at.getTime() / 1000
        ).toString(),
        next: true,
      };
    } else {
      paging = {
        cursor: "",
        next: false,
      };
    }

    return {
      data: posts.slice(0, 5).map((el) => {
        el["id"] = encodePostId(el.id, el.username);
        el.created_at = moment
          .utc(el.created_at)
          .tz("Asia/Jakarta")
          .format("YYYY-MM-DD HH:mm:ss.SSS");
        return el;
      }),
      paging,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchPostServices = async (query: string, cursor: string) => {
  try {
    if (cursor != "") {
      cursor = moment
        .utc(new Date(parseInt(cursor) * 1000))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss.SSS");
    }

    const posts = await searchPosts(query, cursor);

    let paging: Paging;
    if (posts.length > 5) {
      paging = {
        cursor: Math.floor(
          posts[posts.length - 1].created_at.getTime() / 1000
        ).toString(),
        next: true,
      };
    } else {
      paging = {
        cursor: "",
        next: false,
      };
    }

    return {
      data: posts.slice(0, 5).map((el) => {
        el["id"] = encodePostId(el.id, el.username);
        el.created_at = moment
          .utc(el.created_at)
          .tz("Asia/Jakarta")
          .format("YYYY-MM-DD HH:mm:ss.SSS");
        return el;
      }),
      paging,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const myPostServices = async (userId: string, cursor: string) => {
  try {
    if (cursor != "") {
      cursor = moment
        .utc(new Date(parseInt(cursor) * 1000))
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss.SSS");
    }

    const posts = await getPostByUserId(userId, cursor);

    let paging: Paging;
    if (posts.length > 5) {
      paging = {
        cursor: Math.floor(
          posts[posts.length - 1].created_at.getTime() / 1000
        ).toString(),
        next: true,
      };
    } else {
      paging = {
        cursor: "",
        next: false,
      };
    }

    return {
      data: posts.slice(0, 5).map((el) => {
        el["id"] = encodePostId(el.id, el.username);
        el.created_at = moment
          .utc(el.created_at)
          .tz("Asia/Jakarta")
          .format("YYYY-MM-DD HH:mm:ss.SSS");
        return el;
      }),
      paging,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
