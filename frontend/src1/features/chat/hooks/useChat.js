import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../shared/context/SocketContext';

export const useChat = (roomCode, username) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef(null);

  // Load existing messages
  const loadMessages = () => {
    if (socket && roomCode) {
      socket.emit('getChatHistory', { roomCode });
    }
  };

  // Send message
const sendMessage = (message) => {
  if (socket && socket.connected && roomCode && username && message.trim()) {
    console.log("Sending message:", message);
    socket.emit('sendMessage', { roomCode, message: message.trim(), username });
    setChatInput('');
  } else {
    console.warn("Failed to send message due to missing data or socket disconnected");
  }
};


  // Auto-scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Socket event listeners
  useEffect(() => {
    if (!socket || !roomCode) return;

    if (!socket.connected) {
      socket.connect();
      console.log("Socket connected:", socket.connected);
    }

    const onChatHistory = (chatHistory) => {
      console.log("Received chatHistory:", chatHistory);
      setMessages(chatHistory);
    };

    const onChatMessage = (message) => {
      console.log("Received chatMessage:", message);
      setMessages(prev => [...prev, message]);
    };

    socket.on('chatHistory', onChatHistory);
    socket.on('receiveMessage', onChatMessage);

    loadMessages(); 

    return () => {
      socket.off('chatHistory', onChatHistory);
      socket.off('receiveMessage', onChatMessage);
    };
  }, [socket, roomCode]);


  return {
    messages,
    chatInput,
    setChatInput,
    sendMessage,
    messagesEndRef,
    loadMessages
  };
};