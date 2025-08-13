import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 600, margin: "auto" }}>
      <h1>Welcome to the Game!</h1>
      <p>This is the home page. Click below to join the lobby and get started.</p>
      <Link to="/lobby">
        <button style={{ padding: "10px 20px", fontSize: 16 }}>Go to Lobby</button>
      </Link>
    </div>
  );
}
