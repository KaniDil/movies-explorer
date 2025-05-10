import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('movieExplorerUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('movieExplorerUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, you would call your authentication API here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: '123',
            email,
            name: email.split('@')[0],
            avatar: `https://i.pravatar.cc/150?u=${email}`
          };
          setUser(mockUser);
          localStorage.setItem('movieExplorerUser', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate API delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieExplorerUser');
    navigate('/login');
  };

  const register = async (userData) => {

  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}