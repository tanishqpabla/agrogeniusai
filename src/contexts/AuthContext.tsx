import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  phone: string;
  name: string;
  location: string;
  language: 'en' | 'hi';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, name: string, location: string, language: 'en' | 'hi') => void;
  logout: () => void;
  updateProfile: (name: string, location: string) => void;
  updateLanguage: (language: 'en' | 'hi') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agrogenius_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (phone: string, name: string, location: string, language: 'en' | 'hi') => {
    const newUser = {
      phone,
      name,
      location,
      language,
    };
    setUser(newUser);
    localStorage.setItem('agrogenius_user', JSON.stringify(newUser));
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

  const updateLanguage = (language: 'en' | 'hi') => {
    if (user) {
      const updatedUser = { ...user, language };
      setUser(updatedUser);
      localStorage.setItem('agrogenius_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile, updateLanguage }}>
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
