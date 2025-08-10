import { createRoom, joinRoom, leaveRoom, getPlayers } from '../rooms/index.js';

export default function setupRoomEvents(io, socket) {
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
    io.to(roomCode).emit('playerList', getPlayers(roomCode));
    console.log(`${username} joined room ${roomCode}`);
  });

  socket.on('disconnect', () => {
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
}
