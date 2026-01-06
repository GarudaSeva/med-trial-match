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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: '1',
      username: email.split('@')[0],
      email,
      reportsAnalyzed: 3,
      lastUploadDate: new Date().toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem('medtrailmatch_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: '1',
      username,
      email,
      reportsAnalyzed: 0,
      lastUploadDate: null,
    };
    
    setUser(mockUser);
    localStorage.setItem('medtrailmatch_user', JSON.stringify(mockUser));
    return true;
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
