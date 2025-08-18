import React from "react";
import Lobby from "./components/Lobby";
import { useLobby } from "./hooks/useLobby";

const LobbyContainer = ({ roomCode, username }) => {
  const { roomCode: currentRoomCode, players, leaveRoom } = useLobby();

  return (
    <Lobby
      roomCode={currentRoomCode || roomCode}
      players={players}
      username={username}
      leaveRoom={leaveRoom}
    />
  );
}