import { io, Socket } from 'socket.io-client';
import { REACT_APP_BASE_URL } from 'utils/env';

class SocketIOManager {
  private socket: Socket | null = null;

  constructor() {
    this.socket = io(REACT_APP_BASE_URL as string, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 5000,
    });
  }

  public getInstance() {
    return this.socket;
  }

  public emit(key: string, data = {}) {
    if (!this.socket) return;
    this.socket.emit(key, data);
  }

  public on(key: string, callback: (data: any) => void) {
    if (!this.socket) return;
    this.socket.on(key, callback);
  }
}

const SocketManager = new SocketIOManager();
export default SocketManager;
