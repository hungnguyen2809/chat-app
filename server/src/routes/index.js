import { Router } from 'express';
import authRouter from './authRouter';

const routes = Router();

// Auth Router
routes.use('/auth', authRouter);

export default routes;
