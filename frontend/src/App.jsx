import React from "react";
import Lobby from "./pages/Lobby";
import { SocketProvider } from "./context/SocketContext";

export default function App() {
  return (
    <SocketProvider>
      <Lobby />
    </SocketProvider>
  );
}
