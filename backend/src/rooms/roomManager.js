import { generateRoomCode } from './utils/codeGenerator.js';

const rooms = {}; // In-memory storage for rooms

export function createRoom(hostId, username) {
  let roomCode;
  do {
    roomCode = generateRoomCode();
  } while (rooms[roomCode]); // ensure uniqueness

  rooms[roomCode] = {
    players: [{ id: hostId, name: username }],
    hostId,
    judgeId: hostId, // Host is judge initially
    currentTheme: null, // No theme at start
    submissions: [], // No submissions at start
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

      // If the judge left, assign a new judge (first player in list)
      if (room.judgeId === playerId && room.players.length > 0) {
        room.judgeId = room.players[0].id;
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

// Helper to set the theme and reset submissions
export function startRound(roomCode, theme) {
  if (!rooms[roomCode]) return { error: 'Room does not exist.' };
  rooms[roomCode].currentTheme = theme;
  rooms[roomCode].submissions = [];
  return { theme };
}

// Helper to add a submission
export function submitVideo(roomCode, playerId, videoId, start, end) {
  if (!rooms[roomCode]) return { error: 'Room does not exist.' };
  // Prevent duplicate submissions from the same player
  const alreadySubmitted = rooms[roomCode].submissions.some(
    (s) => s.playerId === playerId
  );
  if (alreadySubmitted) return { error: 'Already submitted.' };

  const submission = { playerId, videoId, start, end };
  rooms[roomCode].submissions.push(submission);
  return { submissions: rooms[roomCode].submissions };
}

// Helper to get current round info
export function getRoundInfo(roomCode) {
  if (!rooms[roomCode]) return { error: 'Room does not exist.' };
  const { judgeId, currentTheme, submissions } = rooms[roomCode];
  return { judgeId, currentTheme, submissions };
}
