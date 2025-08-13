// pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">
        <button style={{ padding: "10px 20px", fontSize: 16 }}>Go Home</button>
      </Link>
    </div>
  );
}
