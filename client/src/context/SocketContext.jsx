import { createContext, useContext } from 'react';

const SocketContext = createContext(null);

export const useSocket = () => ({
  socket: null,
  joinMatch: () => {},
  leaveMatch: () => {},
});

export const SocketProvider = ({ children }) => <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;

export default SocketContext;