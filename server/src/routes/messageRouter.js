import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import MiddlewareController from '../controllers/MiddlewareController';
import UserController from '../controllers/UserController';

const messageRouter = Router();

/**
 * @route GET /api/v1/message/get-all
 * @access private
 */
messageRouter.post('/get-all', MiddlewareController.verify, MessageController.getAllMessage);
/**
 * @route POST /api/v1/message/add-message
 * @access private
 */
messageRouter.post('/add-message', MiddlewareController.verify, MessageController.addMessage);

export default messageRouter;
