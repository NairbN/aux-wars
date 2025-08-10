import React from "react";

export default function ChatBox({ children }) {
  return (
    <div
      style={{
        marginTop: 20,
        height: 400,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        padding: 0,
        backgroundColor: "#f9f9f9",
      }}
    >
      {children}
    </div>
  );
}
