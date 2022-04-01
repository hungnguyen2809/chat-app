import { BaseResponse } from 'models';
import { AuthLogin, AuthRegister, UserResponse } from 'redux/auth/type';
import { axiosAuth } from './createRequest';
import URLChatApp from './urlChatApp';

const authApi = {
  registerUser: (data: AuthRegister): Promise<BaseResponse<object>> => {
    return axiosAuth.post(URLChatApp.registerUser, data);
  },
  loginUser: (data: AuthLogin): Promise<BaseResponse<UserResponse>> => {
    return axiosAuth.post(URLChatApp.loginUser, data);
  },
};

export default authApi;
