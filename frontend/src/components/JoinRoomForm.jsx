import React from "react";

export default function JoinRoomForm({
  username,
  setUsername,
  roomCode,
  setRoomCode,
  createRoom,
  joinRoom,
  error,
}) {
  return (
    <>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8 }}
      />
      <input
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        style={{
          width: "100%",
          marginBottom: 8,
          padding: 8,
          textTransform: "uppercase",
        }}
      />
      <button
        onClick={createRoom}
        style={{ width: "100%", padding: 10, marginBottom: 8 }}
      >
        Create Room
      </button>
      <button onClick={joinRoom} style={{ width: "100%", padding: 10 }}>
        Join Room
      </button>
      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
    </>
  );
}
