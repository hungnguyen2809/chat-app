import { Server } from 'socket.io';
import { logger } from '../services/logger';
import SocketChatService from './chat';

export const onlineUsers = new Map();

const io = new Server({ cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    logger.success(`Socket disconnected: ${socket.id}`);
  });

  SocketChatService(socket);
});

export default io;
