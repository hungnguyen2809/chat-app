import { isUndefined, map } from 'lodash';
import UserModel from '../models/UserModel';
import { ResponseService } from '../services';

const UserController = {
  getAllUser: async (req, res) => {
    try {
      const fields = ['id', 'username', 'fullname', 'avatar', 'email'];
      const allUser = await UserModel.find().select(fields);

      const listUser = map(allUser, (user) => {
        const { id, username, fullname, avatar, email } = user;
        return { id, username, fullname, avatar, email };
      });

      return res.json(ResponseService.sucess(listUser));
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
  getUserId: async (req, res) => {
    try {
      const { id: idUser } = req.params;

      if (isUndefined(idUser)) {
        return res.json(ResponseService.error('id user is required!'));
      }

      const fields = ['id', 'username', 'fullname', 'avatar', 'email'];
      const findUser = await UserModel.findById(idUser).select(fields);

      if (!findUser) {
        return res.json(ResponseService.error('User not found !'));
      }

      const { id, username, fullname, email } = findUser;
      return res.json(ResponseService.sucess({ id, username, fullname, email }));
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
  getAllUserOtherId: async (req, res) => {
    try {
      const { id: idUser } = req.params;

      if (isUndefined(idUser)) {
        return res.json(ResponseService.error('id user is required!'));
      }

      const fields = ['id', 'username', 'fullname', 'avatar', 'email'];
      const findAllUser = await UserModel.find({ _id: { $ne: idUser } }).select(fields);

      const listUser = map(findAllUser, (user) => {
        const { id, username, fullname, avatar, email } = user;
        return { id, username, fullname, avatar, email };
      });
      return res.json(ResponseService.sucess(listUser));
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
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
