import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, LoginCredentials } from '@/types/auth';
import toast from 'react-hot-toast';

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true });
          
          // For demo purposes, simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock login logic - reject invalid credentials
          if (credentials.email === 'invalid@example.com' || credentials.password === 'wrongpassword') {
            set({ isLoading: false });
            toast.error('Invalid credentials');
            throw new Error('Invalid credentials');
          }
          
          // Mock successful login
          const mockUser: AuthUser = {
            id: '1',
            name: 'Admin User',
            email: credentials.email,
            role: 'admin',
            permissions: ['users:read', 'users:write', 'products:read', 'products:write', 'analytics:read']
          };
          
          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({ 
            user: mockUser, 
            token: mockToken, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success('Welcome back!');
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        toast.success('Logged out successfully');
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        try {
          set({ isLoading: true });
          // In a real app, verify token with backend
          await new Promise(resolve => setTimeout(resolve, 500));
          set({ isLoading: false });
        } catch (error) {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      setUser: (user: AuthUser | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token: string | null) => {
        set({ token });
      },

      refreshToken: async () => {
        const { token } = get();
        if (!token) {
          throw new Error('No token available');
        }

        try {
          set({ isLoading: true });
          // Simulate API call to refresh token
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const newToken = 'refreshed-token-' + Date.now();
          set({ token: newToken, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
