import React from "react";
import { useParams } from "react-router-dom";
import Game from "../components/game/Game";
import { useLobbyContext } from "../context/LobbyContext";

export default function GamePage() {
  const { roomCode } = useParams();
  const { players, userId } = useLobbyContext();

  // Debug log
  console.log("GamePage roomCode:", roomCode, "players:", players, "userId:", userId);

  // Wait until players are loaded
  if (!roomCode || !players || players.length === 0) {
    return <div>Loading game...</div>;
  }

  return <Game roomCode={roomCode} players={players} userId={userId} />;
}
