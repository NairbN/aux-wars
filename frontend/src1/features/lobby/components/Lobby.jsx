import React from "react";
import { useNavigate } from "react-router-dom";
import RoomCodeDisplay from "./RoomCodeDisplay";
import PlayerList from "./PlayerList";

export default function Lobby({
  roomCode,
  players,
  leaveRoom
}) {
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    leaveRoom();         // reset lobby state
    navigate("/");  // go back to lobby page
  };

  const styles = {
    container: { padding: 20, fontFamily: "sans-serif", maxWidth: 400, margin: "auto" },
    leaveButton: { marginTop: 16, padding: 10, width: "100%" }
  };

  // In a room — show lobby content
  return (
    <div style={styles.container}>
      <RoomCodeDisplay roomCode={roomCode} />
      <PlayerList players={players} />
      <button style={styles.leaveButton} onClick={handleLeaveRoom}>
        Leave Room
      </button>
    </div>
  );
}