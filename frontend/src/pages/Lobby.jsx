import React, { useRef, useEffect } from "react";
import { useLobby } from "../hooks/useLobby";
import { useChat } from "../hooks/useChat";
import PlayerList from "../components/PlayerList";
import Chat from "../components/Chat/Chat"; 

export default function Lobby() {
  console.log("Lobby component rendered");
  const {
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
  } = useLobby();

  const {
    messages,
    chatInput,
    setChatInput,
    sendMessage,
  } = useChat(currentRoom, username);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          <button onClick={createRoom} style={{ width: "100%", padding: 10, marginBottom: 8 }}>
            Create Room
          </button>
          <button onClick={joinRoom} style={{ width: "100%", padding: 10 }}>
            Join Room
          </button>
          {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
        </>
      ) : (
        <>
          <p><strong>Room Code:</strong> {currentRoom}</p>

          <PlayerList players={players} />

          <button onClick={leaveRoom} style={{ marginTop: 16, padding: 10, width: "100%" }}>
            Leave Room
          </button>

          <Chat
            messages={messages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            sendMessage={sendMessage}
            messagesEndRef={messagesEndRef}
          />
        </>
      )}
    </div>
  );
}
