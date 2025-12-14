import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const DEMO_USERS = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    avatar: '',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'demo@taskzen.com',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
    avatar: '',
    createdAt: new Date('2024-01-01'),
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('taskflow_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('taskflow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('taskflow_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${foundUser.firstName} ${foundUser.lastName}`,
      });
      
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try demo@taskzen.com / demo123",
        variant: "destructive",
      });
      
      setIsLoading(false);
      return false;
    }
  }, []);

  const register = useCallback(async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = DEMO_USERS.find(u => u.email === email);
    if (existingUser) {
      toast({
        title: "Registration failed",
        description: "An account with this email already exists",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      avatar: '',
      createdAt: new Date(),
    };

    // Add to demo users (in real app, this would be an API call)
    DEMO_USERS.push({ ...newUser, password } as typeof DEMO_USERS[0]);
    
    setUser(newUser);
    localStorage.setItem('taskflow_user', JSON.stringify(newUser));
    
    toast({
      title: "Account created!",
      description: `Welcome to TaskZen, ${firstName}!`,
    });
    
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('taskflow_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
    
    setIsLoading(false);
    return true;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
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