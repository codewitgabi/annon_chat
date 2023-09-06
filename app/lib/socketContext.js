import { useState } from "react";
import { useContext, useEffect, createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomSize, setRoomSize] = useState(1);
  const [showChatRoom, setShowChatRoom] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    newSocket.on("connect", () => {
      if (!roomId) setRoomId(newSocket.id.substring(0, 5));
    });
    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomId,
        room,
        setRoom,
        roomSize,
        setRoomSize,
        showChatRoom,
        setShowChatRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
