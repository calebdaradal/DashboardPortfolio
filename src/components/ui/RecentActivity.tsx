import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  User, 
  ShoppingCart, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface Activity {
  id: string;
  type: 'user' | 'order' | 'product' | 'system' | 'payment';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, any>;
}

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'user':
      return <User className="w-4 h-4" />;
    case 'order':
      return <ShoppingCart className="w-4 h-4" />;
    case 'product':
      return <Package className="w-4 h-4" />;
    case 'payment':
      return <DollarSign className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusIcon = (status: Activity['status']) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="w-3 h-3 text-success-600" />;
    case 'warning':
      return <AlertTriangle className="w-3 h-3 text-warning-600" />;
    case 'error':
      return <AlertTriangle className="w-3 h-3 text-error-600" />;
    default:
      return <Clock className="w-3 h-3 text-gray-400" />;
  }
};

const getStatusColor = (status: Activity['status']) => {
  switch (status) {
    case 'success':
      return 'bg-success-100 text-success-800';
    case 'warning':
      return 'bg-warning-100 text-warning-800';
    case 'error':
      return 'bg-error-100 text-error-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Icon */}
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        getStatusColor(activity.status)
      )}>
        {getActivityIcon(activity.type)}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">
            {activity.title}
          </p>
          <div className="flex items-center space-x-2">
            {getStatusIcon(activity.status)}
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">
          {activity.description}
        </p>
        
        {activity.user && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-600">
                {activity.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-gray-500">{activity.user.name}</span>
          </div>
        )}
        
        {activity.metadata && (
          <div className="flex items-center space-x-4 mt-2">
            {Object.entries(activity.metadata).map(([key, value]) => (
              <span key={key} className="text-xs text-gray-500">
                <span className="font-medium">{key}:</span> {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const RecentActivity: React.FC<RecentActivityProps> = ({ 
  activities, 
  className 
}) => {
  return (
    <div className={cn('card', className)}>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all
        </button>
      </div>
      
      <div className="divide-y divide-gray-200">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="p-8 text-center">
            <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data generator for testing
export const generateMockActivities = (): Activity[] => {
  const now = new Date();
  return [
    {
      id: '1',
      type: 'user',
      title: 'New user registration',
      description: 'john.doe@example.com signed up for an account',
      timestamp: new Date(now.getTime() - 2 * 60 * 1000),
      status: 'success',
      user: { name: 'John Doe' },
      metadata: { email: 'john.doe@example.com' }
    },
    {
      id: '2',
      type: 'order',
      title: 'Order completed',
      description: 'Order #1234 has been successfully processed',
      timestamp: new Date(now.getTime() - 5 * 60 * 1000),
      status: 'success',
      user: { name: 'Jane Smith' },
      metadata: { orderId: '#1234', amount: '$89.99' }
    },
    {
      id: '3',
      type: 'product',
      title: 'Low inventory warning',
      description: 'Widget Pro is running low on stock',
      timestamp: new Date(now.getTime() - 10 * 60 * 1000),
      status: 'warning',
      metadata: { product: 'Widget Pro', stock: '5 units' }
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment received',
      description: 'Monthly subscription payment processed',
      timestamp: new Date(now.getTime() - 15 * 60 * 1000),
      status: 'success',
      user: { name: 'Mike Johnson' },
      metadata: { amount: '$29.99', plan: 'Pro' }
    },
    {
      id: '5',
      type: 'system',
      title: 'System maintenance',
      description: 'Scheduled maintenance completed successfully',
      timestamp: new Date(now.getTime() - 30 * 60 * 1000),
      status: 'info',
      metadata: { duration: '15 minutes' }
    }
  ];
};
