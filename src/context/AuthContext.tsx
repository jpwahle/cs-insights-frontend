import { createContext, ReactElement, useContext, useState } from 'react';
import { STORAGE_TOKEN } from '../consts';

const AuthContext = createContext<{ token: string; setToken: (token: string) => void } | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider(props: { children: ReactElement | ReactElement[] }) {
  const [token, setToken] = useState<string>(localStorage.getItem(STORAGE_TOKEN) || '');

  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}
