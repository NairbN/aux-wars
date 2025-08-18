import React from 'react';
import Chat from './Chat';
import { useChat } from './hooks/useChat';

const ChatContainer = ({ roomCode, username }) => {
  const {
    messages,
    chatInput,
    setChatInput,
    sendMessage,
    messagesEndRef
  } = useChat(roomCode, username);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput);
    }
  };

  return (

    <Chat
      messages={messages}
      chatInput={chatInput}
      setChatInput={setChatInput}
      sendMessage={() => sendMessage(chatInput)}
      messagesEndRef={messagesEndRef}
      onKeyPress={handleKeyPress}
    />
  );
};

export default ChatContainer;