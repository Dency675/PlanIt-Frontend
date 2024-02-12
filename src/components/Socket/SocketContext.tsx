import React, { createContext, useContext, ReactNode } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext)!;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
