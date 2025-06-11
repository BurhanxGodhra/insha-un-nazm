import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAdmin: () => false,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data (would be replaced with real auth in production)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@poetry.com',
    password: 'password123', // In real app, this would be hashed!
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@poetry.com',
    password: 'password123', // In real app, this would be hashed!
    role: 'user' as const,
  },
];

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('poetry_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Save user to state and localStorage
    setUser(userWithoutPassword);
    localStorage.setItem('poetry_user', JSON.stringify(userWithoutPassword));
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error('Email already in use');
    }
    
    // In a real app, we would create a new user in the database
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: 'user' as const,
    };
    
    // Save user to state and localStorage
    setUser(newUser);
    localStorage.setItem('poetry_user', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('poetry_user');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};