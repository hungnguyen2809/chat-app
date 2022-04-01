import { axiosClient } from './createRequest';
import URLChatApp from './urlChatApp';

const apiChatApp = {
  updateAvatar: ({ id, image }: { id: string; image: string }): Promise<any> => {
    return axiosClient.post(`${URLChatApp.updateAvatar}/${id}`, { image });
  },
};

export default apiChatApp;
