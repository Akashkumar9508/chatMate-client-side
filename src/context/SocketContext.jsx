import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../config/socket";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../features/userSlice";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { status, userData } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      socket.connect();

      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Socket connected:", socket.id);
        socket.emit("userName", userData?.userName);
      });
    }

    socket.on('onlineUsers', (onlineUsers) => dispatch(setOnlineUsers(onlineUsers)));

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [status]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
