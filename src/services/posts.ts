import { CreatePostRequest } from "../schema";
import {
  createPost,
  getAllPost,
  getPostById,
  getPostByUserId,
  getPostByUsername,
  searchPosts,
} from "../db/posts";

export const createPostServices = async (req: CreatePostRequest) => {
  try {
    await createPost(req);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPostServices = async () => {
  try {
    const posts = await getAllPost();

    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostByIdServices = async (id: string) => {
  try {
    const post = await getPostById(id);

    return post;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserPostServices = async (username: string) => {
  try {
    const posts = await getPostByUsername(username);

    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchPostServices = async (query: string) => {
  try {
    const posts = await searchPosts(query);

    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const myPostServices = async (userId: string) => {
  try {
    const posts = await getPostByUserId(userId);

    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};
