# Aux Wars Game Design Document

## Game Concept
A browser-based real-time party game where players battle by picking the best music snippet that matches a theme chosen by the judge.

## Roles
- **Host**: Creates game room, starts game.
- **Judge**: Picks theme, decides winner.
- **Player**: Submits music clip each round.

## Gameplay Loop
1. Judge chooses theme.
2. Players select YouTube clip (30 seconds).
3. Clips are played in sync for all players.
4. Judge chooses winner.
5. Points are awarded, judge rotates.

## MVP Features
- Multiplayer room creation/join.
- Judge theme input.
- YouTube clip submission & playback.
- Synchronized playback order.
- Scoreboard.

## Stretch Goals
- Chat between players.
- Custom avatars.
- Voting system (everyone votes, but judge’s vote counts more).
- Music category filters.

## Technical Notes
- Use YouTube IFrame API for playback with `start` and `end` parameters.
- Use Socket.io for real-time events like:
  - `player_joined`
  - `theme_chosen`
  - `clip_submitted`
  - `start_playback`
  - `round_winner`
