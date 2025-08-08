# Aux Wars – Tech Stack

## 🎯 Overview
Aux Wars is a real-time multiplayer music game. Players join rooms, take turns as the judge, and compete by selecting 30-second YouTube clips matching a theme.

This document outlines the chosen tech stack for both frontend and backend, including APIs and hosting.

---

## 🖥 Frontend
- **Framework**: React (with Vite)
  - Component-based UI for different game screens (Lobby, Song Selection, Playback, Scoreboard)
- **Styling**: Tailwind CSS
  - Utility-first CSS framework for rapid UI development
- **Real-time Communication**: Socket.io Client
  - Handles multiplayer events (join, theme set, submissions, playback, winner selection)
- **YouTube Playback**: YouTube IFrame Player API
  - Embed and control YouTube videos with start/end times

---

## ⚙ Backend
- **Runtime**: Node.js
- **Framework**: Express
  - Handles HTTP endpoints for creating/joining rooms
- **Real-time Communication**: Socket.io
  - Synchronizes game state between players
- **State Storage**:
  - MVP: In-memory JavaScript objects
  - Later: Redis for scalability

---

## 📦 Database (Optional – Post-MVP)
- **MongoDB** for storing:
  - User profiles
  - Game history
  - Persistent leaderboards
- **ORM**: Prisma for schema management

---

## 🔌 APIs
- **YouTube Data API v3** – Search for videos
- **YouTube IFrame API** – Playback control

---

## ☁ Hosting
- **Frontend**: Vercel or Netlify
- **Backend**: Render, Railway, or Heroku
- **Redis (Optional)**: Upstash Redis (serverless)

---

## ✅ Why This Stack
- Fast iteration with Vite + Tailwind
- Beginner-friendly multiplayer setup with Socket.io
- Free-tier hosting options for both frontend & backend
- Legally safe playback using YouTube embed
