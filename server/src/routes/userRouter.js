import { Router } from 'express';
import MiddlewareController from '../controllers/MiddlewareController';
import UserController from '../controllers/UserController';

const userRouter = Router();

/**
 * @route POST /api/v1/user/
 * @access private
 */
userRouter.get('/', MiddlewareController.verify, UserController.getAllUser);
/**
 * @route POST /api/v1/user/all-other/:id
 * @access private
 */
userRouter.get('/all-other/:id', MiddlewareController.verify, UserController.getAllUserOtherId);
/**
 * @route POST /api/v1/user/:id
 * @access private
 */
userRouter.get('/:id', MiddlewareController.verify, UserController.getUserId);
/**
 * @route POST /api/v1/user/avatar/:id
 * @access private
 */
userRouter.post('/avatar/:id', MiddlewareController.verify, UserController.updateAvatar);

export default userRouter;
