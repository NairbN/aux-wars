import { useState, useEffect } from "react";
import { useSocket } from '../../shared/context/SocketContext';

export function useRoomForm() {
  const socket = useSocket();
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  // Create a new room
  const createRoom = () => {
    if (socket && username.trim()) {
      socket.emit('createRoom', { username });
    } else {
      setError("Username is required to create a room.");
    }
  };

  // Join an existing room
  const joinRoom = () => {
    if (socket && roomCode.trim() && username.trim()) {
      socket.emit('joinRoom', { username, roomCode});
    } else {
      setError("Both room code and username are required to join a room.");
    }
  };

  // Listen for errors from the server
  useEffect(() => {
    if (!socket) return;

    const handleError = (errorMessage) => {
      setError(errorMessage);
    };

    socket.on('error', handleError);

    return () => {
      socket.off('error', handleError);
    };
  }, [socket]);

  return {
    username,
    setUsername,
    roomCode,
    setRoomCode,
    createRoom,
    joinRoom,
    error,
  };
}