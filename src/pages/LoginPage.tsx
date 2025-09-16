import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { TextField, CheckboxField, SubmitButton } from '@/components/forms/FormFields';
import { useValidatedForm } from '@/hooks/useValidatedForm';
import { loginSchema } from '@/utils/validationSchemas';

type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from?.pathname || '/';

  const form = useValidatedForm(loginSchema, {
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ email: data.email, password: data.password });
      navigate(from, { replace: true });
    } catch (error) {
      // Error handling is done in the store
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <TextField
        form={form}
        name="email"
        label="Email address"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
      />

      <TextField
        form={form}
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        showPasswordToggle
      />

      <div className="flex items-center justify-between">
        <CheckboxField
          form={form}
          name="rememberMe"
          label="Remember me"
        />

        <div className="text-sm">
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <SubmitButton
        isLoading={isLoading}
        loadingText="Signing in..."
        className="w-full justify-center"
      >
        Sign in
      </SubmitButton>
      
      <div className="mt-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Email:</strong> admin@example.com</p>
            <p><strong>Password:</strong> password123</p>
          </div>
        </div>
      </div>
    </form>
  );
};
