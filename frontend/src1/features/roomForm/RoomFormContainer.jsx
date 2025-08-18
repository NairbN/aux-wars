import React from "react";
import RoomForm from "./components/RoomForm";
import { useRoomForm } from "./hooks/useRoomForm";

export default function RoomFormContainer() {
  const {
    username,
    setUsername,
    roomCode,
    setRoomCode,
    createRoom,
    joinRoom,
    error,
  } = useRoomForm();

  return (
    <div className={styles.container}>
      <RoomForm
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