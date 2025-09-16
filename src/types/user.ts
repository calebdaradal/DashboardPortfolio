// User Management Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  avatar?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  password: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'admin' | 'user' | 'moderator';
  status?: 'active' | 'inactive' | 'suspended';
}

export interface UserFilters {
  search?: string;
  role?: 'admin' | 'user' | 'moderator' | 'all';
  status?: 'active' | 'inactive' | 'suspended' | 'all';
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
}
