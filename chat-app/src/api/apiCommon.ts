import { multiAvatarApi } from './createRequest';

const apiCommon = {
  getMultiAvatars: (ramdomAvtId: number): Promise<any> => {
    return multiAvatarApi.get(`/${ramdomAvtId}`);
  },
};

export default apiCommon;
