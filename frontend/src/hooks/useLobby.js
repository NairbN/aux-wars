import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export function useLobby() {

  const socket = useSocket();
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    

    socket.on("roomCreated", ({ roomCode, players }) => {
      setCurrentRoom(roomCode);
      setPlayers(players);
      setError("");
    });

    socket.on("roomJoined", ({ roomCode, players }) => {
      setCurrentRoom(roomCode);
      setPlayers(players);
      setError("");
    });

    socket.on("playerList", (players) => {
      setPlayers(players);
    });

    socket.on("error", (message) => {
      setError(message);
    });

    return () => {
      socket.off("roomCreated");
      socket.off("roomJoined");
      socket.off("playerList");
      socket.off("error");
    };
  }, [socket]);

function createRoom() {
  console.log("createRoom clicked, username:", username);
  if (!username.trim()) {
    setError("Please enter a username");
    return;
  }
  if (!socket.connected) socket.connect();  // Connect only if not connected
  socket.emit("createRoom", { username });
}

function joinRoom() {
  console.log("joinRoom clicked, username:", username, "roomCode:", roomCode);
  if (!username.trim() || !roomCode.trim()) {
    setError("Please enter username and room code");
    return;
  }
  if (!socket.connected) socket.connect();
  socket.emit("joinRoom", { username, roomCode });
}

  function leaveRoom() {
    socket.disconnect();
    setCurrentRoom(null);
    setPlayers([]);
    setError("");
    setRoomCode("");
    window.location.reload();
  }

  return {
    username,
    setUsername,
    roomCode,
    setRoomCode,
    players,
    currentRoom,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
  };
}

