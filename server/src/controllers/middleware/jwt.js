import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { split } from 'lodash';
import { HEADER_AUTHORIZATION } from '../../constants';
import { logger, ResponseService } from '../../services';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH;

const JWT = {
  sign: (data = {}) => {
    if (!SECRET_KEY) {
      logger.warn('SECRET_KEY is undefined!');
      return '';
    }

    return jwt.sign(data, SECRET_KEY, { expiresIn: '1d' });
  },
  signRefresh: (data = {}) => {
    if (!SECRET_KEY_REFRESH) {
      logger.warn('SECRET_KEY_REFRESH is undefined!');
      return '';
    }

    return jwt.sign(data, SECRET_KEY_REFRESH, { expiresIn: '2d' });
  },
  verify: (req, res, next) => {
    const headerToken = req.header(HEADER_AUTHORIZATION);
    if (!headerToken) {
      return res.status(401).json(ResponseService.error('You are not authenticated', 401));
    }

    try {
      const token = split(headerToken, ' ')[1];
      if (!token) {
        return res.status(403).json(ResponseService.error('Invalid Token', 403));
      }

      const verified = jwt.verify(token, SECRET_KEY);
      req.userInfo = verified; //gán thông tin đã xác thực cho request => các controller cần xử dụng không cần decode lại
      next();
    } catch (error) {
      return res.status(403).json(ResponseService.error('Invalid Token', 403));
    }
  },
  verifyRefresh: (tokenRefresh) => {
    try {
      const verified = jwt.verify(tokenRefresh, SECRET_KEY_REFRESH);
      const { id, username, fullname, admin, age } = verified;
      return {
        token: JWT.sign({ id, username, fullname, age, admin }),
        refreshToken: JWT.signRefresh({ id, username, fullname, age, admin }),
      };
    } catch (error) {
      return {};
    }
  },
};

export default JWT;
