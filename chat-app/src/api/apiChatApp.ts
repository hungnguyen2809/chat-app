import { BaseResponse, UserInfo } from 'models';
import { PayloadAddMessage, PayloadAllMessage } from 'redux/user/type';
import { axiosClient } from './createRequest';
import ChatApp_URL from './urlChatApp';

const apiChatApp = {
  allUser: (): Promise<BaseResponse<UserInfo>> => {
    return axiosClient.get(ChatApp_URL.user);
  },
  allUserOther: (id: string): Promise<BaseResponse<UserInfo[]>> => {
    return axiosClient.get(`${ChatApp_URL.allUserOther}/${id}`);
  },
  userById: (id: string): Promise<any> => {
    return axiosClient.get(`${ChatApp_URL.user}/${id}`);
  },
  updateAvatar: ({ id, image }: { id: string; image: string }): Promise<any> => {
    return axiosClient.post(`${ChatApp_URL.updateAvatar}/${id}`, { image });
  },
  addMessage: (data: PayloadAddMessage): Promise<any> => {
    return axiosClient.post(ChatApp_URL.addMessage, data);
  },
  getAllMessage: (data: PayloadAllMessage): Promise<any> => {
    return axiosClient.post(ChatApp_URL.getAllMessage, data);
  },
};

export default apiChatApp;
