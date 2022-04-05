export interface AuthState {
  userInfo: UserResponse;
}

export interface AuthRegister {
  username: string;
  fullname: string;
  password: string;
  email: string;
}

export interface AuthLogin {
  username: string;
  password: string;
}

export interface UserResponse {
  id?: string;
  username?: string;
  fullname?: string;
  email?: string;
  avatar?: string;
  token?: string;
}

export interface UserInfo {
  id: string;
  username: string;
  fullname?: string;
  email?: string;
  avatar?: string;
}
