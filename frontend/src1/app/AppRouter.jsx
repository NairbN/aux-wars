// AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from "../pages/HomePage";
import LobbyPage from "../pages/LobbyPage";
import GamePage from "../pages/GamePage";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby:roomCode" element={<LobbyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
