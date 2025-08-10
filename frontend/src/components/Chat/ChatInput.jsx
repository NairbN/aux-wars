import React from "react";

export default function ChatInput({ value, onChange, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <>
      <input
        type="text"
        placeholder="Type a message"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        style={{ width: "100%", marginTop: 8, padding: 8 }}
      />
      <button
        onClick={onSend}
        style={{ width: "100%", marginTop: 4, padding: 10 }}
      >
        Send
      </button>
    </>
  );
}
