import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
    withCredentials: true,
    transports: ['websocket'],
});

// Event Handlers
export const setupSocketEvents = (onMessageReceived) => {
    // Handle connection
    socket.on('connect', () => {
        console.log('Connected to server:', socket.id);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    // Handle received messages
    socket.on('receiveMessage', (message) => {
        console.log('Message received:', message);
        if (onMessageReceived) onMessageReceived(message);
    });
};

// Emit events
export const joinRoom = (roomId) => {
    if (roomId) {
        socket.emit('joinRoom', roomId);
        console.log(`Joined room: ${roomId}`);
    }
};

export const sendMessage = (message) => {
        socket.emit('sendMessage', message);
        console.log('Message recived from forntend and sent to backend:', message);
};

export default socket;
