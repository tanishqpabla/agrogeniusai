import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'pa' | 'mr' | 'ta' | 'te' | 'bn';

interface User {
  phone: string;
  name: string;
  location: string;
  language: Language;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (phone: string, name: string, location: string, language: Language) => void;
  loginAsGuest: (language: Language) => void;
  logout: () => void;
  updateProfile: (name: string, location: string) => void;
  updateLanguage: (language: Language) => void;
}

export type { Language };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agrogenius_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (phone: string, name: string, location: string, language: Language) => {
    const newUser = {
      phone,
      name,
      location,
      language,
    };
    setUser(newUser);
    localStorage.setItem('agrogenius_user', JSON.stringify(newUser));
  };

  const loginAsGuest = (language: Language) => {
    const guestUser = {
      phone: '',
      name: 'Guest',
      location: 'India',
      language,
    };
    setUser(guestUser);
    localStorage.setItem('agrogenius_user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrogenius_user');
  };

  const updateProfile = (name: string, location: string) => {
    if (user) {
      const updatedUser = { ...user, name, location };
      setUser(updatedUser);
      localStorage.setItem('agrogenius_user', JSON.stringify(updatedUser));
    }
  };

  const updateLanguage = (language: Language) => {
    if (user) {
      const updatedUser = { ...user, language };
      setUser(updatedUser);
      localStorage.setItem('agrogenius_user', JSON.stringify(updatedUser));
    }
  };

  const isGuest = user?.phone === '';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isGuest, login, loginAsGuest, logout, updateProfile, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
