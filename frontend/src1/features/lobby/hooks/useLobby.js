import { useState, useEffect } from 'react';
import { useSocket } from '../../shared/context/SocketContext';

export const useLobby = () => {
    const socket = useSocket();
    const [roomCode, setRoomCode] = useState("");
    const [players, setPlayers] = useState([]);

    const handleRoomCreated = ({ roomCode, players }) => {
        setRoomCode(roomCode);
        setPlayers(players);
    }

    const handleRoomJoined = ({ roomCode, players }) => {
        setRoomCode(roomCode);
        setPlayers(players);
    };

    const leaveRoom = () => {
        setRoomCode("");
        setPlayers([]);
    }

    useEffect(() => {
        if (!socket) return;

        socket.on("roomCreated", handleRoomCreated);
        socket.on("roomJoined", handleRoomJoined);
        socket.on("playerList", setPlayers);

        return () => {
            socket.off("roomCreated", handleRoomCreated);
            socket.off("roomJoined", handleRoomJoined);
            socket.off("playerList", setPlayers);
        };
    }, [socket]);

    return {
        roomCode,
        players,
        leaveRoom,
    };



}