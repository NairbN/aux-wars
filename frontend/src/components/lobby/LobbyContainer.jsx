import React from "react";
import { useLobby } from "../../hooks/useLobby";
import Lobby from "./Lobby";

export default function LobbyContainer() {
  const lobbyState = useLobby();
  return <Lobby {...lobbyState} />;
}
