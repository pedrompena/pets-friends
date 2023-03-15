import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Context } from "./store/appContext";

export const SocketContext = createContext({});

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { store } = useContext(Context);

  useEffect(() => {
    const URL = store.BACKEND_URL;
    const socketClient = io(URL);
    setSocket(socketClient);
    return () => {
      cleanup;
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
