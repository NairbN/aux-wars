import React, { useState, useContext } from "react";
import { useSocket } from "../context/SocketContext";


export default function RoomControls({ hostId, userId, roomCode, setGameStarted,  players = [], initialRoundTime = 60, initialJudgeRounds = 1  }) {
  const socket = useSocket();
  const [roundTime, setRoundTime] = useState(initialRoundTime);
  const [judgeRounds, setJudgeRounds] = useState(initialJudgeRounds);
  const isHost = userId === hostId;
  const handleStartGame = () => {
    setGameStarted(true);
    console.log("Starting game with settings:", { roomCode, roundTime, judgeRounds });
    // socket.on("startGame", ({ roomCode, roundTime, judgeRounds }) => {
    //     io.to(roomCode).emit("startGame", { 
    //         judgeId: pickFirstJudge(), 
    //         currentTheme: null, 
    //         submissions: [],
    //         roundTime,
    //         judgeRounds
    //     });
    // });
    socket.emit("startGame", { roomCode, roundTime, judgeRounds });


  };

  const handleRoundTimeChange = (e) => {
    const value = Number(e.target.value);
    setRoundTime(value);
    socket.emit("updateSettings", { roomCode, roundTime: value, judgeRounds });
  };

  const handleJudgeRoundsChange = (e) => {
    const value = Number(e.target.value);
    setJudgeRounds(value);
    socket.emit("updateSettings", { roomCode, roundTime, judgeRounds: value });
  };

  if (!isHost) return null;

  const canStart = players.length > 2;

  return (
    <div style={{ marginTop: 16, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Game Controls</h3>
      <label>
        Round Time (seconds):{" "}
        <input
          type="number"
          min={10}
          max={300}
          value={roundTime}
          onChange={handleRoundTimeChange}
          style={{ width: 60 }}
        />
      </label>
      <br />
      <label>
        Judge Rounds per Player:{" "}
        <select value={judgeRounds} onChange={handleJudgeRoundsChange} style={{ width: 60 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <br />
      <button
        onClick={handleStartGame}
        style={{ marginTop: 12, padding: "8px 16px", fontSize: 16 }}
        disabled={!canStart}
        title={!canStart ? "At least 3 players required to start the game" : ""}
      >
        Start Game
      </button>
      {!canStart && (
        <div style={{ color: "red", marginTop: 8 }}>
          At least 3 players are required to start the game.
        </div>
      )}
    </div>
  );
}