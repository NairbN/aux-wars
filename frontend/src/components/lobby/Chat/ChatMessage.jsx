import React from "react";
import styles from "../../../styles/components/ChatMessage.module.css";

export default function ChatMessage({ username, message, timestamp }) {
  return (
    <div className={styles.chatMessage}>
      <strong>{username}</strong>{" "}
      <span style={{ color: "#888" }}>
        [{new Date(timestamp).toLocaleTimeString()}]
      </span>
      : {message}
    </div>
  );
}
