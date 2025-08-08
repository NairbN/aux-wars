# Aux Wars – API & Socket.io Event Specification

## REST API Endpoints (Optional MVP)
Currently, most game logic uses Socket.io, but these HTTP endpoints may be added later for room management or static data.

| Method | Endpoint       | Description                | Request Body                    | Response                |
|--------|----------------|----------------------------|--------------------------------|-------------------------|
| POST   | /create-room   | Create a new game room     | `{ playerName: string }`          | `{ roomCode: string }`   |
| GET    | /room/:code    | Get current room info      | N/A                            | `{ players: [], theme: "" }` |

---

## Socket.io Events

### Client → Server Events

| Event         | Payload                                 | Description                                 |
|---------------|-----------------------------------------|---------------------------------------------|
| `create_room` | `{ playerName: string }`                 | Player requests to create a new game room. Returns room code. |
| `join_room`   | `{ roomCode: string, playerName: string }` | Player joins existing room.                  |
| `set_theme`   | `{ roomCode: string, theme: string }`   | Judge sets the theme for the round.          |
| `submit_clip` | `{ roomCode: string, clip: { videoId: string, start: number, end: number } }` | Player submits YouTube clip for round.       |
| `select_winner` | `{ roomCode: string, winnerId: string }` | Judge selects the winning player for the round. |

---

### Server → Client Events

| Event           | Payload                                   | Description                                  |
|-----------------|-------------------------------------------|----------------------------------------------|
| `room_created`  | `{ roomCode: string }`                      | Confirmation that room was created.           |
| `room_joined`   | `{ roomCode: string, players: Array }`     | Confirmation of join, plus current player list. |
| `player_joined` | `{ player: { id: string, name: string } }` | Notify clients that a new player joined.     |
| `player_left`   | `{ playerId: string }`                       | Notify clients that a player left.            |
| `theme_set`     | `{ theme: string }`                          | Broadcast the current round’s theme.          |
| `clip_submitted`| `{ playerId: string, clip: { videoId, start, end } }` | Confirm a player’s clip submission.           |
| `start_playback`| `{ clips: Array<{ playerId, videoId, start, end }> }` | Signal clients to play all clips in order.   |
| `round_winner`  | `{ winnerId: string, scores: Array }`       | Announce winner and updated scores.           |
| `judge_rotated` | `{ newJudgeId: string }`                     | Notify clients who the next judge is.         |
| `error`         | `{ message: string }`                        | Communicate errors (e.g., invalid room).      |

---

## Payload Details

### Player Object
```json
{
  "id": "socket123",
  "name": "PlayerName",
  "score": 5
}
```
### Clip Object
```json
{
  "videoId": "abc123XYZ",
  "start": 30,
  "end": 60
}
```
### Scores Array
```json
[
  { "playerId": "socket123", "score": 10 },
  { "playerId": "socket456", "score": 7 }
]
```
