export interface BaseResponse<T> {
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
