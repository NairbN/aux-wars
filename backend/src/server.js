import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import setupSocketHandlers from './socket.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware & basic route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Socket.IO events
setupSocketHandlers(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
