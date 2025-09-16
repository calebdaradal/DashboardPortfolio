import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

// Pages
import { LoginPage } from '@/pages/LoginPage';
import { Dashboard } from '@/pages/Dashboard';
import { Analytics } from '@/pages/Analytics';
import { UserManagement } from '@/pages/UserManagement';
import { ProductManagement } from '@/pages/ProductManagement';
import { ProductOverview } from '@/pages/ProductOverview';
import { ProductForm } from '@/pages/ProductForm';
import { NotFound } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'products',
        element: <ProductManagement />,
        children: [
          {
            index: true,
            element: <ProductOverview />,
          },
          {
            path: 'add',
            element: <ProductForm />,
          },
          {
            path: 'edit/:id',
            element: <ProductForm />,
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);
