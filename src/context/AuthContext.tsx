import { createContext, ReactElement, useContext, useState } from 'react';
import { STORAGE_TOKEN } from '../consts';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider(props: { children: ReactElement | ReactElement[] }) {
  const [token, setToken] = useState<string>(localStorage.getItem(STORAGE_TOKEN) || '');

  function login(newToken: string, remember: boolean) {
    setToken(newToken);
    if (remember) {
      localStorage.setItem(STORAGE_TOKEN, newToken);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_TOKEN);
    setToken('');
  }

  return (
    <AuthContext.Provider value={{ token: token, login: login, logout: logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
