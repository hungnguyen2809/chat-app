import { BaseResponse } from 'models';
import { AuthLogin, AuthRegister, UserResponse } from 'redux/auth/type';
import { axiosAuth } from './createRequest';
import ChatApp_URL from './urlChatApp';

const authApi = {
  registerUser: (data: AuthRegister): Promise<BaseResponse<object>> => {
    return axiosAuth.post(ChatApp_URL.registerUser, data);
  },
  loginUser: (data: AuthLogin): Promise<BaseResponse<UserResponse>> => {
    return axiosAuth.post(ChatApp_URL.loginUser, data);
  },
};

export default authApi;
