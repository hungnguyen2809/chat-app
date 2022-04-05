export interface BaseResponse<T = any> {
  data: T;
  error: boolean;
  status: number;
  message: string;
}
