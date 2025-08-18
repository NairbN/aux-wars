import React from "react";
import styles from "../styles/Chat.module.css";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function Chat({ 
  messages, 
  chatInput, 
  setChatInput, 
  sendMessage, 
  messagesEndRef 
}) {
  return (
    <ChatBox>
      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            username={msg.username}
            timestamp={msg.timestamp}
            message={msg.message}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputWrapper}>
        <ChatInput
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onSend={sendMessage}
        />
      </div>
    </ChatBox>
  );
}
