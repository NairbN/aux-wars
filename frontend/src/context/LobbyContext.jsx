// context/LobbyContext.jsx
import React, { createContext, useContext } from "react";
import { useLobby } from "../hooks/useLobby";

const LobbyContext = createContext(null);

export function LobbyProvider({ children }) {
  const lobbyState = useLobby();
  return (
    <LobbyContext.Provider value={lobbyState}>
      {children}
    </LobbyContext.Provider>
  );
}

export function useLobbyContext() {
  const context = useContext(LobbyContext);
  if (!context) {
    throw new Error("useLobbyContext must be used within a LobbyProvider");
  }
  return context;
}
