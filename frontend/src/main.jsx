// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./context/SocketContext";
import { LobbyProvider } from "./context/LobbyContext";
import "./styles/globals.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <LobbyProvider>
        <App />
      </LobbyProvider>
    </SocketProvider>
  </React.StrictMode>
);
