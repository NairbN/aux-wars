import { createRoom, joinRoom, leaveRoom, getPlayers } from './room.js';

export default function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('createRoom', ({ username }) => {
      const { roomCode, players } = createRoom(socket.id, username);

      socket.join(roomCode);
      socket.emit('roomCreated', { roomCode, players });
      console.log(`Room ${roomCode} created by ${username}`);
    });

    socket.on('joinRoom', ({ username, roomCode }) => {
      const result = joinRoom(roomCode, socket.id, username);
      if (result.error) {
        socket.emit('error', result.error);
        return;
      }

      socket.join(roomCode);
      socket.emit('roomJoined', {
        roomCode,
        players: getPlayers(roomCode),
      });
      io.to(roomCode).emit('playerList', getPlayers(roomCode));
      console.log(`${username} joined room ${roomCode}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);

      const leaveResult = leaveRoom(socket.id);
      if (!leaveResult) return;

      const { roomCode, playerName, deleted } = leaveResult;

      if (deleted) {
        console.log(`Room ${roomCode} deleted because it's empty`);
      } else {
        io.to(roomCode).emit('playerList', getPlayers(roomCode));
        console.log(`${playerName} left room ${roomCode}`);
      }
    });

    socket.on('sendMessage', ({ roomCode, username, message }) => {
      if (!roomCode) {
        socket.emit('error', 'Room does not exist.');
        return;
      }
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
