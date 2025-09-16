import React from 'react';
import { Search, Filter, Plus, Download } from 'lucide-react';
import { UserFilters as UserFiltersType } from '@/types';
import { useUserStore } from '@/stores/userStore';

interface UserFiltersProps {
  filters: UserFiltersType;
  onAddUser: () => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({ filters, onAddUser }) => {
  const { setFilters } = useUserStore();
  
  const handleSearchChange = (value: string) => {
    setFilters({ search: value });
  };
  
  const handleRoleChange = (role: UserFiltersType['role']) => {
    setFilters({ role });
  };
  
  const handleStatusChange = (status: UserFiltersType['status']) => {
    setFilters({ status });
  };
  
  const clearFilters = () => {
    setFilters({
      search: '',
      role: 'all',
      status: 'all',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };
  
  const hasActiveFilters = filters.search || 
    (filters.role && filters.role !== 'all') || 
    (filters.status && filters.status !== 'all');
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button onClick={onAddUser} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="form-input pl-10 pr-4"
                placeholder="Search users by name or email..."
                value={filters.search || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          
          {/* Role Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="form-input py-2 px-3 min-w-[120px]"
              value={filters.role || 'all'}
              onChange={(e) => handleRoleChange(e.target.value as UserFiltersType['role'])}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <select
              className="form-input py-2 px-3 min-w-[120px]"
              value={filters.status || 'all'}
              onChange={(e) => handleStatusChange(e.target.value as UserFiltersType['status'])}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-outline px-3 py-2 text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
