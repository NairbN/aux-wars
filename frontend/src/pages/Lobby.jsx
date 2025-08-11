import React, { useRef, useEffect, useState } from "react";
import { useLobby } from "../hooks/useLobby";
import { useChat } from "../hooks/useChat";
import { SocketProvider, useSocket } from "../context/SocketContext";
import PlayerList from "../components/PlayerList";
import Chat from "../components/Chat/Chat"; 
import Game from "../pages/Game";
import JoinRoomForm from "../components/JoinRoomForm";
import RoomControls from "../components/RoomControls"; // <-- Make sure this import exists

export default function Lobby() {
  const socket = useSocket();

  const [gameStarted, setGameStarted] = useState(false);

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

  useEffect(() => {
    socket.on("startGame", () => {
      setGameStarted(true);
    });

    return () => {
      socket.off("startGame");
    };
  }, [socket]);



  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 400, margin: "auto" }}>
      <h1>Game Lobby</h1>

      {!currentRoom ? (
        <JoinRoomForm
          username={username}
          setUsername={setUsername}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          createRoom={createRoom}
          joinRoom={joinRoom}
          error={error}
        />
      ) : !gameStarted ? (
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

          <RoomControls
            hostId= {players[0]?.id}
            userId={socket?.id}
            roomCode={currentRoom}
            setGameStarted={setGameStarted}
            players={players}
          />
        </>
      ) : (
        <Game players={players} userId={socket.id} roomCode={currentRoom} />
      )}
    </div>
  );
}
