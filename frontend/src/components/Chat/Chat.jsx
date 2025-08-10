// components/Chat/Chat.jsx
import React from "react";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function Chat({ messages, chatInput, setChatInput, sendMessage, messagesEndRef }) {
  return (
    <ChatBox>
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "8px 0"
      }}>
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
      <div style={{
        borderTop: "1px solid #eee",
        padding: "8px",
        background: "#fafafa"
      }}>
        <ChatInput
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onSend={sendMessage}
        />
      </div>
    </ChatBox>
  );
}
