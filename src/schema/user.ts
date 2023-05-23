export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
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
}

export interface UpdatePasswordRequest {
  password: string;
  confirmPassword: string;
}

export interface UserLoginResponse {
  token: string;
}
