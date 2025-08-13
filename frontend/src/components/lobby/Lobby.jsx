import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinRoomForm from "./Room/JoinRoomForm";
import RoomCodeDisplay from "./Room/RoomCodeDisplay";
import PlayerList from "./Room/PlayerList";
import ChatContainer from "./Chat/ChatContainer";
import GameSettingsContainer from "./GameSettings/GameSettingsContainer";

export default function Lobby({
  username,
  setUsername,
  roomCode,
  setRoomCode,
  players,
  currentRoom,
  hostId,
  userId,
  error,
  createRoom,
  joinRoom,
  leaveRoom
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentRoom) {
      navigate(`/lobby/${currentRoom}`);
    }
  }, [currentRoom, navigate]);

  const handleLeaveRoom = () => {
    leaveRoom();         // reset lobby state
    navigate("/lobby");  // go back to lobby page
  };

  const styles = {
    container: { padding: 20, fontFamily: "sans-serif", maxWidth: 400, margin: "auto" },
    leaveButton: { marginTop: 16, padding: 10, width: "100%" }
  };

  // Not in a room yet — show join/create form
  if (!currentRoom) {
    return (
      <div style={styles.container}>
        <JoinRoomForm
          username={username}
          setUsername={setUsername}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          createRoom={createRoom}
          joinRoom={joinRoom}
          error={error}
        />
      </div>
    );
  }

  // In a room — show lobby content
  return (
    <div style={styles.container}>
      <RoomCodeDisplay roomCode={currentRoom} />
      <PlayerList players={players} />

      <button onClick={handleLeaveRoom} style={styles.leaveButton}>
        Leave Room
      </button>

      {/* Chat & Game Settings only when inside a room */}
      <ChatContainer roomCode={roomCode} username={username} />
      <GameSettingsContainer
        hostId={hostId}
        userId={userId}
        roomCode={roomCode}
        players={players}
      />
    </div>
  );
}
