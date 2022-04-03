export interface BaseResponse<T = any> {
  data: T;
  error: boolean;
  status: number;
  message: string;
}

export interface ActionError {
  state: boolean;
  message: string;
}

export interface CallbackFunction<S = any, F = any> {
  onSuccess?: (data?: S) => void;
  onFailed?: (data?: F) => void;
}

export interface UserInfo {
  id: string;
  username: string;
  fullname?: string;
  email?: string;
  avatar?: string;
}
