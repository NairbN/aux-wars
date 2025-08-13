// hooks/useLobby.jsx
import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export function useLobby() {
  const socket = useSocket(); // now guaranteed non-null thanks to guard in useSocket

  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [hostId, setHostId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  // Set userId on connect
  useEffect(() => {
    if (!socket) return; // extra guard, just in case

    const handleConnect = () => setUserId(socket.id);

    if (socket.connected) {
      setUserId(socket.id);
    } else {
      socket.on("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socket]);

  // Listen for socket events
  useEffect(() => {
    if (!socket) return;

    const handleRoomCreated = ({ roomCode, players }) => {
      setCurrentRoom(roomCode);
      setRoomCode(roomCode);
      setPlayers(players);
      setHostId(players[0]?.id || null);
      setError("");
    };

    const handleRoomJoined = ({ roomCode, players }) => {
      setCurrentRoom(roomCode);
      setRoomCode(roomCode);
      setPlayers(players);
      setError("");
    };

    socket.on("roomCreated", handleRoomCreated);
    socket.on("roomJoined", handleRoomJoined);
    socket.on("playerList", setPlayers);
    socket.on("error", setError);

    return () => {
      socket.off("roomCreated", handleRoomCreated);
      socket.off("roomJoined", handleRoomJoined);
      socket.off("playerList", setPlayers);
      socket.off("error", setError);
    };
  }, [socket]);

  // Debug
  useEffect(() => {
    console.log("hostId:", hostId, "userId:", userId);
  }, [hostId, userId]);

  // Actions
  function createRoom() {
    if (!username.trim()) return setError("Please enter a username");
    if (!socket.connected) socket.connect();
    socket.emit("createRoom", { username });
  }

  function joinRoom() {
    if (!username.trim() || !roomCode.trim()) {
      return setError("Please enter username and room code");
    }
    if (!socket.connected) socket.connect();
    socket.emit("joinRoom", { username, roomCode });
  }

  function leaveRoom() {
    if (socket.connected) socket.disconnect();

    setCurrentRoom(null);
    setPlayers([]);
    setError("");
    setRoomCode("");
    setHostId(null);
    setUserId(null);
    setUsername("");
  }

  return {
    username,
    setUsername,
    roomCode,
    setRoomCode,
    players,
    currentRoom,
    hostId,
    userId,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
  };
}
