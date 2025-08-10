import {
  createRoom,
  joinRoom,
  leaveRoom,
  getPlayers,
} from './rooms/roomManager.js';

export default function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Create Room
    socket.on('createRoom', ({ username }) => {
      if (!username || typeof username !== 'string') {
        socket.emit('error', 'Invalid username');
        return;
      }

      const { roomCode, players } = createRoom(socket.id, username);

      socket.join(roomCode);
      socket.emit('roomCreated', { roomCode, players });

      console.log(`Room ${roomCode} created by ${username}`);
    });

    // Join Room
    socket.on('joinRoom', ({ username, roomCode }) => {
      if (
        !username ||
        !roomCode ||
        typeof username !== 'string' ||
        typeof roomCode !== 'string'
      ) {
        socket.emit('error', 'Invalid username or room code');
        return;
      }

      const result = joinRoom(roomCode, socket.id, username);

      if (result.error) {
        socket.emit('error', result.error);
        return;
      }

      socket.join(roomCode);
      const players = getPlayers(roomCode);

      io.to(roomCode).emit('playerList', players);
      socket.emit('roomJoined', { roomCode, players });
      console.log(`${username} joined room ${roomCode}`);
    });

    // Disconnect (Leave Room)
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);

      const leaveResult = leaveRoom(socket.id);

      if (!leaveResult) return; // player was not in any room

      const { roomCode, playerName, deleted } = leaveResult;

      if (deleted) {
        console.log(`Room ${roomCode} deleted because it's empty`);
      } else {
        io.to(roomCode).emit('playerList', getPlayers(roomCode));
        console.log(`${playerName} left room ${roomCode}`);
      }
    });

    // Handle chat messages
    socket.on('sendMessage', ({ roomCode, message, username }) => {
      const timestamp = new Date().toISOString();
      // Broadcast to everyone in the room including sender
      io.to(roomCode).emit('receiveMessage', {
        username,
        message,
        timestamp,
      });
    });
  });
}
