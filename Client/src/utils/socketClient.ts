import { io, Socket as SocketType } from 'socket.io-client';

let socket: SocketType | null = null;

export const getSocket = () => {
  if (!socket) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    // Remove /api suffix for socket connection
    const socketUrl = apiBaseUrl.replace('/api', '') || 'https://api.homestaykashmir.com/';
    socket = io(socketUrl, {
      autoConnect: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
