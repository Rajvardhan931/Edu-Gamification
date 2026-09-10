import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext<{
  token: string | null;
  user: any;
  setToken: (t: string | null) => void;
  setUser: (u: any) => void;
}>({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {}
});

export default function App({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleSetToken = (t: string | null) => {
    setToken(t);
    if (t) localStorage.setItem('token', t);
    else localStorage.removeItem('token');
  };

  const handleSetUser = (u: any) => {
    setUser(u);
    if (u) localStorage.setItem('user', JSON.stringify(u));
    else localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken: handleSetToken, setUser: handleSetUser }}>
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <Component {...pageProps} />
      </div>
    </AuthContext.Provider>
  );
}
