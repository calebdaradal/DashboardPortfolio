import React from 'react';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      <div className="card p-6">
        <p className="text-gray-600">Analytics page - Coming soon with detailed charts and reports.</p>
      </div>
    </div>
  );
};

export const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      <div className="card p-6">
        <p className="text-gray-600">User management page - Coming soon with user CRUD operations.</p>
      </div>
    </div>
  );
};

export const ProductManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
      <div className="card p-6">
        <p className="text-gray-600">Product management page - Coming soon with product catalog management.</p>
      </div>
    </div>
  );
};

export const ProductOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Product Overview</h1>
      <div className="card p-6">
        <p className="text-gray-600">Product overview page - Coming soon.</p>
      </div>
    </div>
  );
};

export const ProductForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Product Form</h1>
      <div className="card p-6">
        <p className="text-gray-600">Product form page - Coming soon.</p>
      </div>
    </div>
  );
};

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <a href="/" className="btn-primary">
          Go back home
        </a>
      </div>
    </div>
  );
};;
