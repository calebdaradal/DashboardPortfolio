import { User, CreateUserData, UpdateUserData, UserFilters, PaginatedResponse } from '@/types';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-01-20'),
    avatar: undefined
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    lastLogin: new Date('2024-01-19'),
    avatar: undefined
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'moderator',
    status: 'inactive',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-16'),
    lastLogin: new Date('2024-01-17'),
    avatar: undefined
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
    lastLogin: new Date('2024-01-20'),
    avatar: undefined
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'user',
    status: 'suspended',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-14'),
    lastLogin: new Date('2024-01-15'),
    avatar: undefined
  }
];

let userDatabase = [...mockUsers];
let nextId = 6;

class UserService {

  async getUsers(params?: UserFilters & { page?: number; limit?: number }): Promise<PaginatedResponse<User>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredUsers = [...userDatabase];
    
    // Apply filters
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }
    
    if (params?.role && params.role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === params.role);
    }
    
    if (params?.status && params.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === params.status);
    }
    
    // Apply sorting
    if (params?.sortBy) {
      filteredUsers.sort((a, b) => {
        const aValue = a[params.sortBy as keyof User];
        const bValue = b[params.sortBy as keyof User];
        
        if (aValue instanceof Date && bValue instanceof Date) {
          return params.sortOrder === 'asc' 
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return params.sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return 0;
      });
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    return {
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
        hasNextPage: endIndex < filteredUsers.length,
        hasPreviousPage: page > 1
      }
    };
  }

  async createUser(userData: CreateUserData): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (userDatabase.some(user => user.email === userData.email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser: User = {
      id: nextId.toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: undefined
    };
    
    userDatabase.push(newUser);
    nextId++;
    
    return newUser;
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userIndex = userDatabase.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Check if email already exists (excluding current user)
    if (userData.email && 
        userDatabase.some(user => user.email === userData.email && user.id !== id)) {
      throw new Error('User with this email already exists');
    }
    
    const updatedUser: User = {
      ...userDatabase[userIndex],
      ...userData,
      updatedAt: new Date()
    };
    
    userDatabase[userIndex] = updatedUser;
    
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const userIndex = userDatabase.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    userDatabase.splice(userIndex, 1);
  }

  async getUserById(id: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = userDatabase.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }
}

export const userService = new UserService();
