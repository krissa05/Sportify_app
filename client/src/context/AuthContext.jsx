import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => ({
  user: { name: 'Krissa', email: 'krissa0507@gmail.com', _id: '123', id: '123' },
  token: 'demo-token',
  loading: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;

export default AuthContext;