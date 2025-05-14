
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'user' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  user: User | null;
  favorites: string[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleFavorite: (carId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Get favorites from localStorage
    const storedFavorites = localStorage.getItem('carFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    // This is a mock login that would be replaced with a real API call
    // In a real app, you would validate credentials against a backend
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll have a hardcoded admin user
    if (email === 'admin@example.com' && password === 'password') {
      const userData: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', 'admin');
      return;
    }
    
    // For demo purposes, let any other email/password be a regular user
    const userData: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: 'user'
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', 'user');
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  };
  
  const toggleFavorite = (carId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId];
      
      // Save to localStorage
      localStorage.setItem('carFavorites', JSON.stringify(newFavorites));
      
      return newFavorites;
    });
  };
  
  return (
    <UserContext.Provider
      value={{
        user,
        favorites,
        isLoggedIn: !!user,
        login,
        logout,
        toggleFavorite
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
