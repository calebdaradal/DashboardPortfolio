import React, { useEffect } from 'react';
import { X, User, Mail, Shield } from 'lucide-react';
import { User as UserType, CreateUserData, UpdateUserData } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { TextField, SelectField, SubmitButton } from '@/components/forms/FormFields';
import { useValidatedForm } from '@/hooks/useValidatedForm';
import { createUserSchema, updateUserSchema } from '@/utils/validationSchemas';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType | null;
}

type CreateFormData = {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  password: string;
};

type UpdateFormData = {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
};

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
  const { createUser, updateUser, isLoading } = useUserStore();
  const isEditMode = !!user;
  
  const createForm = useValidatedForm(createUserSchema, {
    defaultValues: {
      name: '',
      email: '',
      role: 'user' as const,
      password: ''
    }
  });
  
  const updateForm = useValidatedForm(updateUserSchema, {
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'user' as const,
      status: user?.status || 'active' as const
    }
  });
  
  const form = isEditMode ? updateForm : createForm;
  
  useEffect(() => {
    if (isOpen) {
      const resetValues = isEditMode 
        ? {
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || 'user' as const,
            status: user?.status || 'active' as const
          }
        : {
            name: '',
            email: '',
            role: 'user' as const,
            password: ''
          };
      form.reset(resetValues);
    }
  }, [user, isOpen, isEditMode, form.reset]);
  
  const onSubmit = async (data: any) => {
    try {
      if (isEditMode && user) {
        const updateData: UpdateUserData = data as UpdateFormData;
        await updateUser(user.id, updateData);
      } else {
        const createData: CreateUserData = data as CreateFormData;
        await createUser(createData);
      }
      onClose();
    } catch (error) {
      // Error handling is done in the store
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-content w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditMode ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <TextField
            form={form as any}
            name="name"
            label="Full Name"
            placeholder="Enter full name"
            disabled={isLoading}
          />
          
          <TextField
            form={form as any}
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            disabled={isLoading}
          />
          
          <SelectField
            form={form as any}
            name="role"
            label="Role"
            disabled={isLoading}
            options={[
              { value: 'user', label: 'User' },
              { value: 'moderator', label: 'Moderator' },
              { value: 'admin', label: 'Admin' }
            ]}
          />
          
          {/* Status Field (only for edit mode) */}
          {isEditMode && (
            <SelectField
              form={form as any}
              name="status"
              label="Status"
              disabled={isLoading}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'suspended', label: 'Suspended' }
              ]}
            />
          )}
          
          {/* Password Field (only for create mode) */}
          {!isEditMode && (
            <TextField
              form={form as any}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter password (min. 6 characters)"
              disabled={isLoading}
              showPasswordToggle
            />
          )}
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline w-full sm:w-auto"
              disabled={isLoading}
            >
              Cancel
            </button>
            <SubmitButton
              isLoading={isLoading}
              loadingText={isEditMode ? 'Updating...' : 'Creating...'}
              className="w-full sm:w-auto"
            >
              {isEditMode ? 'Update User' : 'Create User'}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
