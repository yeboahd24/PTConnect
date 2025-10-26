import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/schema';
import { UserRole } from '@/types/enums';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email: string, _password: string, role: UserRole) => {
        // Mock login - in production, this would call an API
        const mockUser: User = {
          id: "user-1",
          name: email.split('@')[0],
          email,
          role,
          avatar: "https://i.pravatar.cc/150?img=12",
          token: "mock-jwt-token-" + Date.now()
        };
        
        set({
          user: mockUser,
          token: mockUser.token,
          isAuthenticated: true
        });
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      
      setUser: (user: User) => {
        set({
          user,
          token: user.token,
          isAuthenticated: true
        });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);