import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext"; // adjust import as needed

export default function Game({ players = [], userId, roomCode }) {
  const socket = useSocket();
  const [judgeId, setJudgeId] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [submissions, setSubmissions] = useState([]);

    const navigate = useNavigate();
  
    useEffect(() => {
      if (roomCode) {
        navigate(`/game/${roomCode}`); 
      }
    }, [roomCode, navigate]);

  useEffect(() => {
    if (!socket) return;

    // Request current round info when component mounts
    socket.emit("getRoundInfo", { roomCode });

    socket.on("startGame", ({ judgeId, currentTheme, submissions }) => {
      setJudgeId(judgeId);
      setCurrentTheme(currentTheme);
      setSubmissions(submissions || []);
    });

    socket.on("roundStarted", ({ theme }) => {
      setCurrentTheme(theme);
      setSubmissions([]);
    });

    socket.on("submissionsUpdated", ({ submissions }) => {
      setSubmissions(submissions || []);
    });

    socket.on("roundInfo", ({ judgeId, currentTheme, submissions }) => {
      setJudgeId(judgeId);
      setCurrentTheme(currentTheme);
      setSubmissions(submissions || []);
    });

    return () => {
      socket.off("startGame");
      socket.off("roundStarted");
      socket.off("submissionsUpdated");
      socket.off("roundInfo");
    };
  }, [socket, roomCode]);

  const judgeName = players.find((p) => p.id === judgeId)?.name || "Unknown";

  return (
    <div>
      <div>
        <strong>Judge:</strong> {judgeName}
      </div>
      <div>
        <strong>Theme:</strong> {currentTheme || "No theme set"}
      </div>

      {/* Example: Submissions list */}
      <div>
        <h4>Submissions:</h4>
        {submissions.length > 0 ? (
          <ul>
            {submissions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p>No submissions yet</p>
        )}
      </div>
    </div>
  );
}
