import React from "react";

export default function ChatBox({ children }) {
  return (
    <div
      style={{
        marginTop: 20,
        height: 150,
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: 8,
        backgroundColor: "#f9f9f9",
      }}
    >
      {children}
    </div>
  );
}
