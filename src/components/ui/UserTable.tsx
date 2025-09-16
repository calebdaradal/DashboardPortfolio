import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Shield, 
  User as UserIcon, 
  Crown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { User, UserFilters } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/utils/cn';

interface UserTableProps {
  users: User[];
  filters: UserFilters;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  isLoading?: boolean;
}

const getRoleIcon = (role: User['role']) => {
  switch (role) {
    case 'admin':
      return <Crown className="w-4 h-4 text-amber-600" />;
    case 'moderator':
      return <Shield className="w-4 h-4 text-blue-600" />;
    default:
      return <UserIcon className="w-4 h-4 text-gray-600" />;
  }
};

const getRoleBadge = (role: User['role']) => {
  const styles = {
    admin: 'bg-amber-100 text-amber-800',
    moderator: 'bg-blue-100 text-blue-800',
    user: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <span className={cn('status-badge', styles[role])}>
      {getRoleIcon(role)}
      <span className="ml-1 capitalize">{role}</span>
    </span>
  );
};

const getStatusBadge = (status: User['status']) => {
  const styles = {
    active: 'status-success',
    inactive: 'status-inactive',
    suspended: 'status-error'
  };
  
  return (
    <span className={cn('status-badge', styles[status])}>
      <span className="capitalize">{status}</span>
    </span>
  );
};

const UserTableRow: React.FC<{
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ user, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <tr className="table-row-hover">
      <td className="table-body td">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>
      
      <td className="table-body td">
        {getRoleBadge(user.role)}
      </td>
      
      <td className="table-body td">
        {getStatusBadge(user.status)}
      </td>
      
      <td className="table-body td text-sm text-gray-500">
        {format(user.createdAt, 'MMM dd, yyyy')}
      </td>
      
      <td className="table-body td text-sm text-gray-500">
        {user.lastLogin ? format(user.lastLogin, 'MMM dd, yyyy') : 'Never'}
      </td>
      
      <td className="table-body td">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-modal border border-gray-200 z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit();
                    setShowActions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4 mr-3" />
                  Edit User
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setShowActions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-3" />
                  Delete User
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const SortButton: React.FC<{
  field: keyof User;
  currentSort: UserFilters;
  onSort: (field: keyof User) => void;
  children: React.ReactNode;
}> = ({ field, currentSort, onSort, children }) => {
  const isActive = currentSort.sortBy === field;
  const isAsc = currentSort.sortOrder === 'asc';
  
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
    >
      <span>{children}</span>
      {isActive && (
        isAsc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
      )}
    </button>
  );
};

export const UserTable: React.FC<UserTableProps> = ({
  users,
  filters,
  onEditUser,
  onDeleteUser,
  isLoading = false
}) => {
  const { setFilters } = useUserStore();
  
  const handleSort = (field: keyof User) => {
    const newOrder = filters.sortBy === field && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({ sortBy: field, sortOrder: newOrder });
  };
  
  if (isLoading) {
    return (
      <div className="card">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading users...</p>
        </div>
      </div>
    );
  }
  
  if (users.length === 0) {
    return (
      <div className="card">
        <div className="p-8 text-center">
          <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header th">
                <SortButton field="name" currentSort={filters} onSort={handleSort}>
                  User
                </SortButton>
              </th>
              <th className="table-header th">
                <SortButton field="role" currentSort={filters} onSort={handleSort}>
                  Role
                </SortButton>
              </th>
              <th className="table-header th">
                <SortButton field="status" currentSort={filters} onSort={handleSort}>
                  Status
                </SortButton>
              </th>
              <th className="table-header th">
                <SortButton field="createdAt" currentSort={filters} onSort={handleSort}>
                  Created
                </SortButton>
              </th>
              <th className="table-header th">
                <SortButton field="lastLogin" currentSort={filters} onSort={handleSort}>
                  Last Login
                </SortButton>
              </th>
              <th className="table-header th">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={() => onEditUser(user)}
                onDelete={() => onDeleteUser(user)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
