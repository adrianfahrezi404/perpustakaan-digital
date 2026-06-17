import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import api, { getCsrfCookie } from '../lib/api';
import type { User, LoginCredentials, RegisterData } from '../lib/types';

// ---- Types ----

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<any>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

// ---- Context ----

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---- Provider ----

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  /**
   * Fetch current authenticated user from the API.
   * Called on mount and after login/register.
   */
  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.get<{ data: User }>('/auth/user');
      setUser(data.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login with email and password.
   * 1. Get CSRF cookie from Sanctum
   * 2. POST credentials to login endpoint
   * 3. Fetch user data
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    await getCsrfCookie();
    await api.post('/auth/login', credentials);
    const { data } = await api.get<{ data: User }>('/auth/user');
    setUser(data.data);
    setIsLoading(false);
    return data.data;
  }, []);

  /**
   * Register a new member account.
   * After registration, user is automatically logged in.
   */
  const register = useCallback(async (data: RegisterData) => {
    await getCsrfCookie();
    await api.post('/auth/register', data);
    await fetchUser();
  }, [fetchUser]);

  /**
   * Logout — destroy session on server and clear local state.
   */
  const logout = useCallback(async () => {
    await api.post('/auth/logout');
    setUser(null);
  }, []);

  // Auto-check auth status on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---- Hook ----

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
