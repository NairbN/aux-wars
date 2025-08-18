import React from "react";
import { useGameSettings } from "./hooks/useGameSettings";
import GameSettings from "./components/GameSettings";

const GameSettingsContainer = ({ hostId, userId, roomCode, players }) => {
  const {
    isHost,
    canStart,
    roundTime,
    judgeRounds,
    handleStartGame,
    handleRoundTimeChange,
    handleJudgeRoundsChange
  } = useGameSettings(hostId, userId, roomCode, players);
  
  if (!isHost) return null;

  return (
    <GameSettings
      isHost={isHost}
      canStart={canStart}
      roundTime={roundTime}
      judgeRounds={judgeRounds}
      handleStartGame={handleStartGame}
      handleRoundTimeChange={handleRoundTimeChange}
      handleJudgeRoundsChange={handleJudgeRoundsChange}
      players={players}
    />
  );
}

export default GameSettingsContainer;