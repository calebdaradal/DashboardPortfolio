import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification } from '@/types/common';

interface UIStore {
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  notifications: Notification[];
  
  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      sidebarOpen: false,
      theme: 'light',
      loading: false,
      notifications: [],

      toggleSidebar: () => {
        set((state) => ({ 
          sidebarCollapsed: !state.sidebarCollapsed,
          sidebarOpen: window.innerWidth < 1024 ? !state.sidebarOpen : state.sidebarOpen
        }));
      },

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ sidebarCollapsed: collapsed });
      },

      openSidebar: () => {
        set({ sidebarOpen: true });
      },

      closeSidebar: () => {
        set({ sidebarOpen: false });
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ theme });
        // Apply theme to document
        document.documentElement.className = theme;
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          read: false,
        };
        
        set((state) => ({ 
          notifications: [newNotification, ...state.notifications] 
        }));

        // Auto-remove notification after delay if autoClose is true
        if (notification.autoClose !== false) {
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, 5000);
        }
      },

      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },

      markNotificationAsRead: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
          )
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ 
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme
      }),
    }
  )
);
