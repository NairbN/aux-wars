import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Lobby() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // Scroll chat to bottom
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("roomCreated", ({ roomCode, players }) => {
      setCurrentRoom(roomCode);
      setPlayers(players);
      setError("");
    });

    socket.on('roomJoined', ({ roomCode, players }) => {
        setCurrentRoom(roomCode);
        setPlayers(players);
        setError("");
    });

    socket.on("playerList", (players) => {
      setPlayers(players);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("error", (message) => {
      setError(message);
    });

    return () => {
      socket.off("roomCreated");
      socket.off("playerList");
      socket.off("receiveMessage");
      socket.off("error");
    };
  }, []);

  function handleCreateRoom() {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    socket.emit("createRoom", { username });
  }

  function handleJoinRoom() {
    if (!username.trim() || !roomCode.trim()) {
      setError("Please enter username and room code");
      return;
    }
    socket.emit("joinRoom", { username, roomCode });
  }

  function handleLeaveRoom() {
    socket.disconnect();
    setCurrentRoom(null);
    setPlayers([]);
    setError("");
    // Reconnect socket for future use
    // (socket.io-client automatically reconnects on next emit)
    // But better to create a new socket instance:
    window.location.reload(); // simple way to reset for now
  }

  function handleSendMessage() {
    if (!chatInput.trim()) return;
    socket.emit("sendMessage", {
      roomCode: currentRoom,
      username,
      message: chatInput,
    });
    setChatInput("");
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 400, margin: "auto" }}>
      <h1>Game Lobby</h1>

      {!currentRoom ? (
        <>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <input
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            style={{ width: "100%", marginBottom: 8, padding: 8, textTransform: "uppercase" }}
          />
          <button onClick={handleCreateRoom} style={{ width: "100%", padding: 10, marginBottom: 8 }}>
            Create Room
          </button>
          <button onClick={handleJoinRoom} style={{ width: "100%", padding: 10 }}>
            Join Room
          </button>
          {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
        </>
      ) : (
        <>
          <p>
            <strong>Room Code:</strong> {currentRoom}
          </p>
          <h3>Players:</h3>
          <ul>
            {players.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
          <button onClick={handleLeaveRoom} style={{ marginTop: 16, padding: 10, width: "100%" }}>
            Leave Room
          </button>

                    <div style={{ marginTop: 20, height: 150, overflowY: "auto", border: "1px solid #ccc", padding: 8 }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <strong>{msg.username}</strong> [{new Date(msg.timestamp).toLocaleTimeString()}]: {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <input
            type="text"
            placeholder="Type a message"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            style={{ width: "100%", marginTop: 8, padding: 8 }}
          />
          <button onClick={handleSendMessage} style={{ width: "100%", marginTop: 4, padding: 10 }}>
            Send
          </button>
        </>
      )}
    </div>
  );
}
