import { NavigationItem } from '@/types';

export const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: 'LayoutDashboard',
    description: 'Overview and key metrics',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: 'BarChart3',
    description: 'Detailed reports and insights',
  },
  {
    name: 'Users',
    href: '/users',
    icon: 'Users',
    description: 'User account management',
  },
  {
    name: 'Products',
    href: '/products',
    icon: 'Package',
    description: 'Product catalog management',
    children: [
      {
        name: 'Overview',
        href: '/products',
        icon: 'Eye',
        description: 'Product overview and statistics',
      },
      {
        name: 'Add Product',
        href: '/products/add',
        icon: 'Plus',
        description: 'Create new product',
      },
    ],
  },
];

export const userMenuItems = [
  {
    name: 'Profile',
    href: '/profile',
    icon: 'User',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'Settings',
  },
  {
    name: 'Sign out',
    href: '/logout',
    icon: 'LogOut',
  },
];
