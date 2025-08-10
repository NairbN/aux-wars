import React from "react";

export default function ChatMessage({ username, message, timestamp }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <strong>{username}</strong>{" "}
      <span style={{ color: "#888" }}>
        [{new Date(timestamp).toLocaleTimeString()}]
      </span>
      : {message}
    </div>
  );
}
