# Aux Wars – Milestones & Development Roadmap

## 🎯 Purpose
This document outlines the key development phases for Aux Wars, from the initial MVP to future enhancements. Each milestone is broken into achievable tasks to help track progress.

---

## 📅 Milestone 1 – Project Setup (Week 1)
**Goal:** Create a clean foundation for development.

**Tasks:**
- [x] Initialize GitHub repository with `.gitignore`, `README.md`, and `LICENSE`.
- [x] Set up `docs/` folder with initial files (`tech_stack.md`, `architecture.md`, `milestones.md`).
- [x] Create frontend project with React + Vite + Tailwind.
- [x] Create backend project with Node.js + Express + Socket.io.
- [x] Configure ESLint + Prettier for consistent code style.
- [x] Commit and push to GitHub.

---

## 📅 Milestone 2 – Core Multiplayer System (Weeks 2–3)
**Goal:** Allow players to join the same game lobby and exchange real-time messages.

**Tasks:**
- [ ] Implement backend socket server with room creation & joining.
- [ ] Generate unique room codes for hosts.
- [ ] Handle player join/leave events.
- [ ] Broadcast updated player list to all clients in a room.
- [ ] Create simple frontend lobby UI that shows connected players.

---

## 📅 Milestone 3 – Game Round Flow (Weeks 4–5)
**Goal:** Enable judge rotation, theme selection, and basic submission handling.

**Tasks:**
- [ ] Assign a judge for the first round (host starts as judge).
- [ ] Allow judge to set a theme and broadcast to players.
- [ ] Implement YouTube search using YouTube Data API.
- [ ] Players submit `{ videoId, start, end }` to backend.
- [ ] Backend stores submissions for current round.
- [ ] Sync judge and player UI to show round progress.

---

## 📅 Milestone 4 – Clip Playback & Winner Selection (Weeks 6–7)
**Goal:** Play submitted clips for all players in sync and allow judge to pick a winner.

**Tasks:**
- [ ] Integrate YouTube IFrame Player API in frontend.
- [ ] Play each submitted clip sequentially for all players.
- [ ] Allow judge to select a round winner.
- [ ] Update scores in backend and broadcast scoreboard.
- [ ] Rotate judge role for next round.

---

## 📅 Milestone 5 – MVP Polishing & Deployment (Weeks 8–9)
**Goal:** Launch a playable MVP online.

**Tasks:**
- [ ] Basic responsive UI styling with Tailwind.
- [ ] Add loading states and error handling for API calls.
- [ ] Deploy backend (Railway/Render/Heroku).
- [ ] Deploy frontend (Vercel/Netlify).
- [ ] Test game flow end-to-end with friends.

---

## 📅 Milestone 6 – Post-MVP Features (Future)
**Goal:** Improve game experience and scalability.

**Ideas:**
- [ ] Add persistent user accounts (via OAuth or email login).
- [ ] Store game history in MongoDB.
- [ ] Redis for scalable game state handling.
- [ ] Chat system for players in the lobby and during rounds.
- [ ] Theme suggestions powered by AI.
- [ ] Mobile-friendly UI improvements.
- [ ] Sound effects and animations for round results.
- [ ] Public “join a random game” feature.

---

## ✅ Progress Tracking
Update this file as milestones are completed. Each task should be checked `[x]` when finished.

