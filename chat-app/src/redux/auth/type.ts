import { NavigateFunction } from 'react-router-dom';

export interface AuthState {
  loading: boolean;
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

export interface PayloadRegister extends AuthRegister {
  navigate: NavigateFunction;
}

export interface PayloadLogin extends AuthLogin {
  navigate: NavigateFunction;
}

export interface PayloadUpdateAvtar {
  id: string;
  image: string;
  navigate: NavigateFunction;
}

export interface UserResponse {
  id?: string;
  username?: string;
  fullname?: string;
  email?: string;
  avatar?: string;
  token?: string;
}
