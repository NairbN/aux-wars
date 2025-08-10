import { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";

export function useChat(roomCode, username) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log("useChat running");

    if (!roomCode) return;

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, roomCode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!chatInput.trim()) return;
    socket.emit("sendMessage", {
      roomCode,
      username,
      message: chatInput,
    });
    setChatInput(""); // clear after sending
  }

  return {
    messages,
    chatInput,
    setChatInput,
    sendMessage,
    messagesEndRef
  };
}
