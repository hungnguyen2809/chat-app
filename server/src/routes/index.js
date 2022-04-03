import { Router } from 'express';
import authRouter from './authRouter';
import messageRouter from './messageRouter';
import userRouter from './userRouter';

const routes = Router();

// Auth Router
routes.use('/auth', authRouter);
// User Router
routes.use('/user', userRouter);
// Message Router
routes.use('/message', messageRouter);

export default routes;
