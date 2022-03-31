import bcrypt from 'bcrypt';
import { get, isUndefined } from 'lodash';
import UserModel from '../models/User';
import { ResponseService } from '../services';
import JWT from './middleware/jwt';

const AuthController = {
  /**
   * @description Login user
   */
  loginUser: async (req, res) => {
    try {
      const { username: us, password: pw } = req.body;

      if (isUndefined(us) || isUndefined(pw)) {
        return res.json(ResponseService.error('Ivalid data, username and password is required !'));
      }

      const findUser = await UserModel.findOne({ username: us });
      if (!findUser) {
        return res.json(ResponseService.error('User not found !'));
      }

      const validPassword = await bcrypt.compare(pw, findUser.password);
      if (!validPassword) {
        return res.json(ResponseService.error('Password is wrong!'));
      }

      const { id, username, fullname, email, avatar } = findUser;
      const token = JWT.sign({ id, username, fullname, email, avatar });

      const data = { id, username, fullname, email, avatar, token };
      return res.json(ResponseService.sucess(data));
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
  /**
   * @description Register user
   */
  registerUser: async (req, res) => {
    try {
      const { username, password, fullname } = req.body;

      if (isUndefined(username) || isUndefined(password) || isUndefined(fullname)) {
        return res.json(
          ResponseService.error('Ivalid data, username, password, fullname is required !')
        );
      }

      const findUserByUsername = await UserModel.findOne({ username });
      if (findUserByUsername) {
        return res.json(ResponseService.error('Username is already exist !'));
      }

      const slat = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, slat);

      const newUser = new UserModel({ username, fullname, password: passwordHash });
      await newUser.save();

      return res.json(ResponseService.sucess());
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
};

export default AuthController;
