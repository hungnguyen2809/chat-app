import { Router } from 'express';
import MiddlewareController from '../controllers/MiddlewareController';
import UserController from '../controllers/UserController';

const userRouter = Router();

/**
 * @route POST /api/v1/user/avatar/:id
 * @access private
 */
userRouter.post('/avatar/:id', MiddlewareController.verify, UserController.updateAvatar);

export default userRouter;
