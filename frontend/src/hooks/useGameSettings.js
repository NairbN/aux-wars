import { useState } from 'react';
import { useSocket } from '../context/SocketContext';

export const useGameSettings = (
    hostId, 
    userId, 
    roomCode,
    players, 
    initialRoundTime = 60, 
    initialJudgeRounds = 1
) => {
  const socket = useSocket();
  const [roundTime, setRoundTime] = useState(initialRoundTime);
  const [judgeRounds, setJudgeRounds] = useState(initialJudgeRounds);
  const canStart = players?.length > 2;
  const isHost = userId === hostId;

  const handleStartGame = () => {
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

  return {
    isHost,
    canStart,
    roundTime,
    judgeRounds,
    handleStartGame,
    handleRoundTimeChange,
    handleJudgeRoundsChange
  };
}