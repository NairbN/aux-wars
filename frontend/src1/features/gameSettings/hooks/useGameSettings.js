import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

export const useGameSettings = () => {
  const socket = useSocket();
  const [roundTime, setRoundTime] = useState(60);
  const [judgeRounds, setJudgeRounds] = useState(1);
  const [isHost, setIsHost] = useState(false);
  const [canStart, setCanStart] = useState(false);
  

  const startGame = () => {
    console.log("Starting game with settings:", { roomCode, roundTime, judgeRounds });
    socket.emit("startGame", { roomCode, roundTime, judgeRounds });
  };

  const handleRoundTimeChange = (value) => {
    setRoundTime(value);
    socket.emit("updateSettings", { roomCode, roundTime: value, judgeRounds });
  };

  const handleJudgeRoundsChange = (value) => {
    setJudgeRounds(value);
    socket.emit("updateSettings", { roomCode, roundTime, judgeRounds: value });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on()

  }, [socket]);


  return {
    isHost,
    canStart,
    roundTime,
    judgeRounds,
    startGame,
    handleRoundTimeChange,
    handleJudgeRoundsChange
  };
}