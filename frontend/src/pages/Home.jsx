import React, { useState } from "react";
import { SocketProvider } from "../context/SocketContext";
import Lobby from "./Lobby";

export default function Home() {
    const [openLobby, setOpenLobby] = useState(false);

    return (
        <div style={{ padding: 20, fontFamily: "sans-serif", textAlign: "center" }}>
            
            {!openLobby ? (
                <>
                <h1>Welcome to auxwars</h1>
                <button onClick={() => setOpenLobby(true)} style={{ padding: 10, fontSize: 16 }}>
                    Open Lobby  
                </button>
                </>
            ) : (
                <SocketProvider>
                    <Lobby />
                </SocketProvider>
            )}
        </div>
    );
}