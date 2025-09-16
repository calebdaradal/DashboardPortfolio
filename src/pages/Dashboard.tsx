import React from 'react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Package,
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';
import { StatsCards } from '@/components/ui/StatsCards';
import { 
  RevenueChart, 
  UserGrowthChart, 
  OrdersChart, 
  CategoryChart 
} from '@/components/ui/Charts';
import { RecentActivity, generateMockActivities } from '@/components/ui/RecentActivity';

// Mock data for charts
const revenueData = [
  { date: 'Jan', revenue: 45 },
  { date: 'Feb', revenue: 52 },
  { date: 'Mar', revenue: 48 },
  { date: 'Apr', revenue: 61 },
  { date: 'May', revenue: 55 },
  { date: 'Jun', revenue: 67 },
  { date: 'Jul', revenue: 69 },
  { date: 'Aug', revenue: 78 },
  { date: 'Sep', revenue: 72 },
  { date: 'Oct', revenue: 85 },
  { date: 'Nov', revenue: 89 },
  { date: 'Dec', revenue: 92 }
];

const userGrowthData = [
  { date: 'Week 1', newUsers: 120, returningUsers: 340 },
  { date: 'Week 2', newUsers: 132, returningUsers: 356 },
  { date: 'Week 3', newUsers: 145, returningUsers: 378 },
  { date: 'Week 4', newUsers: 158, returningUsers: 392 }
];

const ordersData = [
  { date: 'Mon', orders: 45 },
  { date: 'Tue', orders: 52 },
  { date: 'Wed', orders: 38 },
  { date: 'Thu', orders: 61 },
  { date: 'Fri', orders: 73 },
  { date: 'Sat', orders: 85 },
  { date: 'Sun', orders: 56 }
];

const categoryData = [
  { name: 'Electronics', value: 145 },
  { name: 'Clothing', value: 89 },
  { name: 'Books', value: 67 },
  { name: 'Home & Garden', value: 43 },
  { name: 'Sports', value: 32 }
];

const statsData = [
  {
    title: 'Total Users',
    value: '2,543',
    change: 12.5,
    changeType: 'positive' as const,
    icon: <Users className="w-6 h-6 text-primary-600" />,
    description: '+156 new users this month'
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: 8.2,
    changeType: 'positive' as const,
    icon: <DollarSign className="w-6 h-6 text-success-600" />,
    description: 'Monthly recurring revenue'
  },
  {
    title: 'Orders',
    value: '1,234',
    change: -2.1,
    changeType: 'negative' as const,
    icon: <ShoppingCart className="w-6 h-6 text-warning-600" />,
    description: 'Total orders processed'
  },
  {
    title: 'Products',
    value: '892',
    change: 5.7,
    changeType: 'positive' as const,
    icon: <Package className="w-6 h-6 text-purple-600" />,
    description: 'Active products in catalog'
  }
];

const mockActivities = generateMockActivities();

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="btn-outline w-full sm:w-auto">
            <Eye className="w-4 h-4 mr-2" />
            View Report
          </button>
          <button className="btn-primary w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <StatsCards stats={statsData} />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} className="lg:col-span-2" />
        
        <UserGrowthChart data={userGrowthData} />
        <OrdersChart data={ordersData} />
        
        <CategoryChart data={categoryData} />
        
        {/* Quick Stats */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Conversion Rate</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">3.2%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-success-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Active Sessions</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">1,429</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-warning-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Avg. Order Value</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">$67.32</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <RecentActivity activities={mockActivities} />
    </div>
  );
};
