import mongoose from "mongoose";
import { CreatePostRequest } from "../schema";
import { UserModel } from "./users";

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  deletedAt: { type: Date, default: null },
});

export const PostModel = mongoose.model("Post", PostSchema);

export const createPost = (post: CreatePostRequest) =>
  new PostModel(post).save();

export const getAllPost = () => PostModel.find();

export const getPostById = (id: string) => PostModel.findById(id);

export const getPostByUsername = (username: string) =>
  UserModel.findOne({ username })
    .populate({ path: "posts", select: "body" })
    .exec()
    .then((resp) => resp)
    .catch((err) => err.message);

export const searchPosts = (query: string) =>
  UserModel.find({
    $or: [
      { username: { $regex: query, $options: "i" } },
      { "posts.body": { $regex: query, $options: "i" } },
    ],
  })
    .populate({
      path: "posts",
      select: "_id body createdAt",
    })
    .exec()
    .then((resp) => resp)
    .catch((err) => err.message);

export const getPostByUserId = (userId: string) =>
  PostModel.find({ user: userId });
