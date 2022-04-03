import { Server } from 'socket.io';
import { SK_CS_ADD_USER, SK_CS_SEND_MESSAGE, SK_SS_SEND_MESSAGE } from './constants';

const io = new Server({ cors: { origin: '*' } });

const onlineUsers = new Map();

io.on('connection', (socket) => {
  socket.on(SK_CS_ADD_USER, (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);
  });

  socket.on(SK_CS_SEND_MESSAGE, (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit(SK_SS_SEND_MESSAGE, data.message);
    }
  });
});

export default io;
