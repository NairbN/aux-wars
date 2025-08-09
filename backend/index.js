const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // allow requests from any origin (adjust this for production)
  }
});

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });

  // Add more socket event listeners here
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

