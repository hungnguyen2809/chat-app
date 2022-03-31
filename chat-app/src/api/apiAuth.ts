import { BaseResponse } from 'models';
import { AuthLogin, AuthRegister, UserResponse } from 'redux/auth/type';
import { axiosAuth } from './createRequest';

const authApi = {
  registerUser: (data: AuthRegister): Promise<BaseResponse<object>> => {
    return axiosAuth.post('/auth/user-register', data);
  },
  loginUser: (data: AuthLogin): Promise<BaseResponse<UserResponse>> => {
    return axiosAuth.post('/auth/user-login', data);
  },
};

export default authApi;
