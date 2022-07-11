import React, { createContext, useState } from 'react';
import { STORAGE_TOKEN } from '../consts';

const AuthContext = createContext<{ token: string; setToken: (token: string) => void } | undefined>(
  undefined
);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [token, setToken] = useState<string>(localStorage.getItem(STORAGE_TOKEN) || '');

  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
