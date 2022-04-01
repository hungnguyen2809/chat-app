import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';

const routes = Router();

// Auth Router
routes.use('/auth', authRouter);
// User Router
routes.use('/user', userRouter);

export default routes;
