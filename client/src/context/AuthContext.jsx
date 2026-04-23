import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

const demoUser = {
  name: "Krissa",
  _id: "123",
  id: "123"
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{
    user: demoUser,
    token: "demo-token",
    loading: false
  }}>
    {children}
  </AuthContext.Provider>
);

export default AuthContext;