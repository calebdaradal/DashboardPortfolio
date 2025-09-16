import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { UserFilters } from '@/components/ui/UserFilters';
import { UserTable } from '@/components/ui/UserTable';
import { UserModal } from '@/components/ui/UserModal';
import { Pagination } from '@/components/ui/Pagination';
import { User } from '@/types';

export const UserManagement: React.FC = () => {
  const { 
    users, 
    filters, 
    pagination, 
    isLoading, 
    fetchUsers, 
    setPage,
    deleteUser
  } = useUserStore();
  
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, filters, pagination.page]);
  
  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };
  
  const handleDeleteUser = (user: User) => {
    setShowDeleteConfirm(user);
  };
  
  const confirmDeleteUser = async () => {
    if (showDeleteConfirm) {
      try {
        await deleteUser(showDeleteConfirm.id);
        setShowDeleteConfirm(null);
      } catch (error) {
        // Error handling is done in the store
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <UserFilters filters={filters} onAddUser={handleAddUser} />
      
      <UserTable
        users={users}
        filters={filters}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        isLoading={isLoading}
      />
      
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit}
          onPageChange={setPage}
          className="mt-6"
        />
      )}
      
      {/* User Modal */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={selectedUser}
      />
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-content w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete User
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="btn-danger"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
