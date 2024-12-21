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
};


export default socket;
