import { isUndefined } from 'lodash';
import UserModel from '../models/User';
import { ResponseService } from '../services';

const UserController = {
  updateAvatar: async (req, res) => {
    try {
      const { id: idUser } = req.params;
      const { image: imageSet } = req.body;

      if (isUndefined(idUser) || !imageSet) {
        return res.json(ResponseService.error('id user anh image is required!'));
      }

      const findUser = await UserModel.findByIdAndUpdate(idUser, {
        avatar: imageSet,
      });

      if (!findUser) {
        return res.json(ResponseService.error('User not found !'));
      }

      const { id, username, fullname, email } = findUser;
      const data = { id, username, fullname, email, avatar: imageSet };

      return res.json(ResponseService.sucess(data));
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
};

export default UserController;
