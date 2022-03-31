import { BaseResponse } from 'models';
import { AuthRegister, UserResponse } from 'redux/auth/type';
import { axiosClient } from './createRequest';

const authApi = {
  registerUser: (data: AuthRegister): Promise<BaseResponse<UserResponse>> => {
    return axiosClient.post('/auth-register', data);
  },
  loginUser: (data: object): Promise<BaseResponse<UserResponse>> => {
    return axiosClient.post('/auth-login', data);
  },
};

export default authApi;
