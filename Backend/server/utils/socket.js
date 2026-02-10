import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

export const emitAdUpdate = (adId, status) => {
  if (io) {
    io.emit('adUpdate', { adId, status });
  }
};

export const emitUserUpdate = (userId, data) => {
  if (io) {
    io.emit('userUpdate', { userId, ...data });
  }
};

export const emitTransactionUpdate = (transactionId, status) => {
  if (io) {
    io.emit('transactionUpdate', { transactionId, status });
  }
};