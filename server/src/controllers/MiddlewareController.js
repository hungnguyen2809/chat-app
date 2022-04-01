import JWT from './middleware/jwt';

const MiddlewareController = {
  verify: (req, res, next) => {
    JWT.verify(req, res, next);
  },
};

export default MiddlewareController;
