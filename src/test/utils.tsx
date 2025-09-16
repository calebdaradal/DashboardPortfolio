import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Mock providers wrapper
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <Toaster />
    </BrowserRouter>
  );
};

// Custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock user for testing
export const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin' as const,
  status: 'active' as const,
  createdAt: new Date('2024-01-01'),
  lastLogin: new Date('2024-01-15'),
};

// Mock product for testing
export const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'A test product description',
  price: 99.99,
  category: 'Electronics',
  stock: 50,
  status: 'active' as const,
  images: ['https://via.placeholder.com/300x300?text=Test'],
  sku: 'TEST-001',
  tags: ['test', 'electronics'],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
};

// Mock stats data
export const mockStatsData = [
  {
    title: 'Total Users',
    value: '2,543',
    change: 12.5,
    changeType: 'positive' as const,
    icon: React.createElement('div', { 'data-testid': 'users-icon' }),
    description: '+156 new users this month'
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: 8.2,
    changeType: 'positive' as const,
    icon: React.createElement('div', { 'data-testid': 'revenue-icon' }),
    description: 'Monthly recurring revenue'
  }
];

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override render method
export { customRender as render };
