import { Request } from "express";

export interface CustomError {
  code: number;
  message: string;
  additionalInfo?: string;
}

export interface Paging {
  next?: boolean;
  cursor?: string;
}

export interface DataResponse {
  code: number;
  data: object;
  paging?: Paging;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  salt: string;
  createdAt? : Date;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  location: string;
  updatedAt?: Date;
}

export interface UpdatePasswordRequest {
  password: string;
  confirmPassword: string;
  salt?: string;
  updatedAt?: Date;
}

export interface CreatePostRequest {
    user: string
    body: string
}

export interface CustomRequest extends Request {
  userId: string;
}
