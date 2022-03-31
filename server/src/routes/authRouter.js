import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

/**
 * @route POST /api/v1/auth/user-login
 * @access public
 */
authRouter.post('/user-login', AuthController.loginUser);

/**
 * @route POST /api/v1/auth/user-register
 * @access public
 */
authRouter.post('/user-register', AuthController.registerUser);

export default authRouter;
