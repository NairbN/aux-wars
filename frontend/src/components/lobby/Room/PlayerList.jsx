import React from "react";

export default function PlayerList({ players }) {
  return (
    <>
      <h3>Players:</h3>
      <ul>
        {players.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}
