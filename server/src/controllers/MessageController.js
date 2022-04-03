import { get } from 'lodash';
import MessageModel from '../models/MessageModel';
import { ResponseService } from '../services';
import { v4 as uuid } from 'uuid';

const MessageController = {
  addMessage: async (req, res) => {
    try {
      const { from, to, message } = req.body;
      if (!from || !to || !message) {
        return res.json(ResponseService.error('from, to, message is required!'));
      }

      const data = await MessageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      if (!data) {
        return res.json(ResponseService.error('Failed to add message to database'));
      }

      return res.json(ResponseService.sucess());
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
  getAllMessage: async (req, res) => {
    try {
      const { from, to } = req.body;
      if (!from || !to) {
        return res.json(ResponseService.error('from, to, message is required!'));
      }

      const messages = await MessageModel.find({
        users: { $all: [from, to] },
      }).sort({ updateAt: 1 });

      const allMessages = messages.map((msg) => ({
        id: uuid(),
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }));

      return res.json(ResponseService.sucess(allMessages));
    } catch (error) {
      return res.json(ResponseService.error(get(error, 'message')));
    }
  },
};

export default MessageController;
