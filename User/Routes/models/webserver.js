import { WebSocketServer } from 'ws';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const server = new WebSocketServer({ port: 3002 });
 // Your Express app

const io = new SocketIOServer(server, {
    cors: {
        origin: "https://dinein.live",
        methods: ["GET", "POST","PATCH", "DELETE", "OPTIONS"],
        credentials: true
    }
});

// WebSocket events
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log('Received:', message);
        // Handle the message received from the client
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:3002');
