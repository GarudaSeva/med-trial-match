import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  reportsAnalyzed: number;
  lastUploadDate: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateReportStats: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('medtrailmatch_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      const loggedInUser: User = {
        id: data.user?.id || '1',
        username: data.user?.username || email.split('@')[0],
        email: data.user?.email || email,
        reportsAnalyzed: data.user?.reportsAnalyzed || 0,
        lastUploadDate: data.user?.lastUploadDate || null,
      };
      
      setUser(loggedInUser);
      localStorage.setItem('medtrailmatch_user', JSON.stringify(loggedInUser));
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      
      const newUser: User = {
        id: data.user?.id || '1',
        username: data.user?.username || username,
        email: data.user?.email || email,
        reportsAnalyzed: 0,
        lastUploadDate: null,
      };
      
      setUser(newUser);
      localStorage.setItem('medtrailmatch_user', JSON.stringify(newUser));
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medtrailmatch_user');
  };

  const updateReportStats = () => {
    if (user) {
      const updatedUser = {
        ...user,
        reportsAnalyzed: user.reportsAnalyzed + 1,
        lastUploadDate: new Date().toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem('medtrailmatch_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout,
      updateReportStats 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
