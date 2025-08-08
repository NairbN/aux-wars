# Aux Wars – System Architecture

## 🎯 Purpose
This document describes how the frontend, backend, and external services (YouTube APIs) interact to support real-time multiplayer gameplay.

---

## 🏗 High-Level Architecture
[ Player Browser (Frontend) ] <---> [ Node.js Server (Backend) ] <---> [ YouTube APIs ]

### Components:
1. **Frontend (React + Vite)**
   - Handles user interface and interactions.
   - Embeds YouTube videos via the IFrame Player API.
   - Connects to backend over WebSockets (Socket.io Client).
   
2. **Backend (Node.js + Express + Socket.io)**
   - Manages game rooms and player connections.
   - Handles real-time events (theme selection, submissions, playback sync).
   - Maintains game state in memory (MVP) or Redis (future).
   
3. **External Services**
   - **YouTube Data API v3**: Searches for videos by keyword.
   - **YouTube IFrame Player API**: Plays embedded videos with start/end times.

---

## 🔄 Game Flow Diagram
```text
┌───────────────────┐
│ Host creates room │
└───────┬───────────┘
│ Room code + link sent
▼
┌────────────────────┐
│ Players join lobby │
└───────┬────────────┘
│ Judge assigned
▼
┌────────────────────────┐
│ Judge sets round theme │
└───────┬────────────────┘
│ Theme broadcast to all players
▼
┌──────────────────────────────────┐
│ Players search/select YouTube clip│
└───────┬──────────────────────────┘
│ Clip info sent to backend
▼
┌────────────────────────────┐
│ Backend queues submissions │
└───────┬────────────────────┘
│ Playback start event sent
▼
┌───────────────────────────┐
│ Clients play clips in sync │
└───────┬───────────────────┘
│ Judge selects winner
▼
┌─────────────────────────┐
│ Scoreboard updates │
└─────────────────────────┘
```
---

## 📡 Real-Time Events (Socket.io)
- `create_room` → Host creates game.
- `join_room` → Player joins game with code.
- `set_theme` → Judge sends theme to all players.
- `submit_clip` → Player sends `{ videoId, start, end }`.
- `start_playback` → Backend signals all clients to play clips in order.
- `round_winner` → Judge selects winner; scores update.
- `next_round` → Backend rotates judge and starts new round.

---

## 📂 Data Structures

### Game State (in backend memory)
```js
{
  roomCode: "ABCD",
  hostId: "socket123",
  players: [
    { id: "socket123", name: "Host", score: 0 },
    { id: "socket456", name: "Player2", score: 0 }
  ],
  currentRound: 1,
  judgeIndex: 0,
  theme: "Best hype song",
  submissions: [
    { playerId: "socket456", videoId: "abc123", start: 30, end: 60 }
  ]
}
```
