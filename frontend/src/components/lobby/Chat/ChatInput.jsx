import React from "react";
import styles from "../../../styles/components/ChatInput.module.css";

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
        className={styles.input}
      />
      <button onClick={onSend} className={styles.button}>
        Send
      </button>
    </>
  );
}
