# Aux Wars 🎵⚔️

**Aux Wars** is a real-time multiplayer music battle game inspired by Skribbl.io and Jackbox.  
Players join a game room, take turns as the judge, and compete to find the best 30-second song clip from YouTube that matches the judge’s theme.

---

## 🎮 Game Flow
1. Host creates a game room and shares the join link.
2. Players join the lobby and choose display names.
3. Each round, one player is the judge and picks a theme.
4. All other players pick a 30-second YouTube clip.
5. Clips play for everyone (without revealing who picked what).
6. Judge picks the winner → scores update.
7. Rotate judge → repeat until game ends.

---

## 🛠️ Tech Stack
- **Frontend**: React + Socket.io + YouTube IFrame API
- **Backend**: Node.js + Express + Socket.io
- **Hosting**:
  - Frontend → Vercel/Netlify
  - Backend → Render/Heroku
- **APIs**: YouTube Data API v3 for search, IFrame Player API for playback

---

## 🚀 Milestones

### Milestone 1 — Multiplayer Lobby
- Host can create a game room with a code/link.
- Players can join and see names in lobby.

### Milestone 2 — Judge + Theme
- Judge is assigned each round.
- Judge can type in a theme.

### Milestone 3 — Song Submission
- Players submit YouTube link + start time.

### Milestone 4 — Playback Sync
- All clients play clips in the same order.

### Milestone 5 — Winner Selection
- Judge picks winner, scores update.
- Judge rotates each round.

---

## 📜 License
MIT
