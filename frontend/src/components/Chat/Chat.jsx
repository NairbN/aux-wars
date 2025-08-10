// components/Chat/Chat.jsx
import React from "react";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function Chat({ messages, chatInput, setChatInput, sendMessage, messagesEndRef }) {
  return (
    <ChatBox>
      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          username={msg.username}
          timestamp={msg.timestamp}
          message={msg.message}
        />
      ))}
      <div ref={messagesEndRef} />
      <ChatInput
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onSend={sendMessage}
      />
    </ChatBox>
  );
}
