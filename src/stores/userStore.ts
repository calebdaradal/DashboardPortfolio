import { create } from 'zustand';
import { User, CreateUserData, UpdateUserData, UserFilters } from '@/types';
import { userService } from '@/services/userService';
import toast from 'react-hot-toast';

interface UserStore {
  users: User[];
  selectedUser: User | null;
  filters: UserFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  
  // Actions
  fetchUsers: () => Promise<void>;
  createUser: (userData: CreateUserData) => Promise<void>;
  updateUser: (id: string, userData: UpdateUserData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setFilters: (filters: Partial<UserFilters>) => void;
  setPage: (page: number) => void;
}

export const useUserStore = create<UserStore>()((set, get) => ({
  users: [],
  selectedUser: null,
  filters: {
    search: '',
    role: 'all',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },
  isLoading: false,

  fetchUsers: async () => {
    try {
      set({ isLoading: true });
      const { filters, pagination } = get();
      
      const response = await userService.getUsers({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });
      
      set({ 
        users: response.data,
        pagination: response.pagination,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch users');
    }
  },

  createUser: async (userData: CreateUserData) => {
    try {
      set({ isLoading: true });
      
      const newUser = await userService.createUser(userData);
      
      set((state) => ({
        users: [newUser, ...state.users],
        isLoading: false
      }));
      
      toast.success('User created successfully');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to create user');
      throw error;
    }
  },

  updateUser: async (id: string, userData: UpdateUserData) => {
    try {
      set({ isLoading: true });
      
      const updatedUser = await userService.updateUser(id, userData);
      
      set((state) => ({
        users: state.users.map(user => 
          user.id === id ? updatedUser : user
        ),
        selectedUser: state.selectedUser?.id === id ? updatedUser : state.selectedUser,
        isLoading: false
      }));
      
      toast.success('User updated successfully');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to update user');
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      set({ isLoading: true });
      
      await userService.deleteUser(id);
      
      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        isLoading: false
      }));
      
      toast.success('User deleted successfully');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to delete user');
      throw error;
    }
  },

  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },

  setFilters: (newFilters: Partial<UserFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }
    }));
  },

  setPage: (page: number) => {
    set((state) => ({
      pagination: { ...state.pagination, page }
    }));
  }
}));
