import { NavigateFunction } from 'react-router-dom';

export interface AuthState {
  loading: boolean;
  userInfo?: UserResponse;
}

export interface AuthRegister {
  username: string;
  password: string;
  email: string;
}

export interface PayloadRegister extends AuthRegister {
  navigate: NavigateFunction;
}

export interface UserResponse {
  username: string;
  email: string;
  token: string;
}
