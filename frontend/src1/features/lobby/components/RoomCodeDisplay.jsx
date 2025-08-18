import React from "react";

export default function RoomCodeDisplay({ roomCode }) {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <h2>Room Code</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{roomCode}</p>
    </div>
  );
}