import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import config from '../config/config.js';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null); // Initialize as null to avoid potential errors
  const [socket,setSocket]=useState();

  useEffect(() => {
    socketRef.current = io(config.apiUrl);
    setSocket(socketRef.current);

    socket.on('connect', () => {
      console.log('Connected to server. Socket ID:', socket.id);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const {socket} = useContext(SocketContext);
  console.log(socket);
  
  return socket;
};