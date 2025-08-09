const rooms = {}; // In-memory storage for rooms

function generateRoomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function createRoom(hostId, username) {
  let roomCode;
  do {
    roomCode = generateRoomCode();
  } while (rooms[roomCode]); // ensure uniqueness

  rooms[roomCode] = {
    players: [{ id: hostId, name: username }],
    hostId,
  };

  return { roomCode, players: rooms[roomCode].players };
}

export function joinRoom(roomCode, playerId, username) {
  roomCode = roomCode.toUpperCase();

  if (!rooms[roomCode]) {
    return { error: 'Room does not exist.' };
  }

  rooms[roomCode].players.push({ id: playerId, name: username });

  return { players: rooms[roomCode].players };
}

export function leaveRoom(playerId) {
  for (const roomCode in rooms) {
    const room = rooms[roomCode];
    const playerIndex = room.players.findIndex((p) => p.id === playerId);

    if (playerIndex !== -1) {
      const playerName = room.players[playerIndex].name;
      room.players.splice(playerIndex, 1); // Remove player

      if (room.players.length === 0) {
        delete rooms[roomCode];
        return { roomCode, deleted: true };
      }

      return { roomCode, playerName, deleted: false };
    }
  }

  return null;
}

export function getPlayers(roomCode) {
  if (!rooms[roomCode]) return [];
  return rooms[roomCode].players;
}
