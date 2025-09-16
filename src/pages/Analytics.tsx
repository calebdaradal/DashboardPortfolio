import React, { useState } from 'react';
import { Calendar, Download, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { 
  RevenueChart, 
  UserGrowthChart, 
  OrdersChart, 
  CategoryChart 
} from '@/components/ui/Charts';
import { StatsCards } from '@/components/ui/StatsCards';
import { cn } from '@/utils/cn';

type DateRangePreset = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';

interface DateRange {
  startDate: Date;
  endDate: Date;
  preset: DateRangePreset;
}

// Extended mock data for analytics
const extendedRevenueData = [
  { date: 'Jan', revenue: 45, orders: 120, users: 450 },
  { date: 'Feb', revenue: 52, orders: 135, users: 520 },
  { date: 'Mar', revenue: 48, orders: 125, users: 480 },
  { date: 'Apr', revenue: 61, orders: 158, users: 610 },
  { date: 'May', revenue: 55, orders: 142, users: 580 },
  { date: 'Jun', revenue: 67, orders: 178, users: 650 },
  { date: 'Jul', revenue: 69, orders: 185, users: 680 },
  { date: 'Aug', revenue: 78, orders: 201, users: 720 },
  { date: 'Sep', revenue: 72, orders: 189, users: 690 },
  { date: 'Oct', revenue: 85, orders: 225, users: 780 },
  { date: 'Nov', revenue: 89, orders: 238, users: 820 },
  { date: 'Dec', revenue: 92, orders: 245, users: 850 }
];

const conversionData = [
  { date: 'Week 1', conversions: 3.2, visitors: 1200, leads: 38 },
  { date: 'Week 2', conversions: 3.8, visitors: 1350, leads: 51 },
  { date: 'Week 3', conversions: 2.9, visitors: 1180, leads: 34 },
  { date: 'Week 4', conversions: 4.1, visitors: 1420, leads: 58 },
  { date: 'Week 5', conversions: 3.6, visitors: 1280, leads: 46 },
  { date: 'Week 6', conversions: 4.3, visitors: 1510, leads: 65 }
];

const trafficSourceData = [
  { name: 'Organic Search', value: 45, color: '#3b82f6' },
  { name: 'Direct', value: 28, color: '#10b981' },
  { name: 'Social Media', value: 15, color: '#f59e0b' },
  { name: 'Email', value: 8, color: '#ef4444' },
  { name: 'Referral', value: 4, color: '#8b5cf6' }
];

const analyticsStats = [
  {
    title: 'Total Revenue',
    value: '$124,563',
    change: 12.5,
    changeType: 'positive' as const,
    icon: <TrendingUp className="w-6 h-6 text-success-600" />,
    description: 'vs last period'
  },
  {
    title: 'Conversion Rate',
    value: '3.6%',
    change: 8.2,
    changeType: 'positive' as const,
    icon: <TrendingUp className="w-6 h-6 text-primary-600" />,
    description: 'avg conversion rate'
  },
  {
    title: 'Avg Order Value',
    value: '$67.32',
    change: -2.1,
    changeType: 'negative' as const,
    icon: <TrendingDown className="w-6 h-6 text-warning-600" />,
    description: 'per transaction'
  },
  {
    title: 'Customer LTV',
    value: '$234.56',
    change: 15.7,
    changeType: 'positive' as const,
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    description: 'lifetime value'
  }
];

const DateRangePicker: React.FC<{
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}> = ({ dateRange, onDateRangeChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  
  const presetOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'thisMonth', label: 'This month' },
    { value: 'lastMonth', label: 'Last month' },
    { value: 'thisYear', label: 'This year' }
  ];
  
  const getDateRangeFromPreset = (preset: DateRangePreset): DateRange => {
    const now = new Date();
    
    switch (preset) {
      case 'today':
        return { startDate: now, endDate: now, preset };
      case 'yesterday':
        const yesterday = subDays(now, 1);
        return { startDate: yesterday, endDate: yesterday, preset };
      case 'last7days':
        return { startDate: subDays(now, 7), endDate: now, preset };
      case 'last30days':
        return { startDate: subDays(now, 30), endDate: now, preset };
      case 'thisMonth':
        return { startDate: startOfMonth(now), endDate: endOfMonth(now), preset };
      case 'lastMonth':
        const lastMonth = subDays(startOfMonth(now), 1);
        return { startDate: startOfMonth(lastMonth), endDate: endOfMonth(lastMonth), preset };
      case 'thisYear':
        return { startDate: startOfYear(now), endDate: endOfYear(now), preset };
      default:
        return dateRange;
    }
  };
  
  const handlePresetChange = (preset: DateRangePreset) => {
    const newRange = getDateRangeFromPreset(preset);
    onDateRangeChange(newRange);
    setShowPicker(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="btn-outline flex items-center space-x-2"
      >
        <Calendar className="w-4 h-4" />
        <span>
          {format(dateRange.startDate, 'MMM dd')} - {format(dateRange.endDate, 'MMM dd, yyyy')}
        </span>
      </button>
      
      {showPicker && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-modal border border-gray-200 z-10">
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Select Date Range</h4>
            <div className="space-y-2">
              {presetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePresetChange(option.value as DateRangePreset)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                    dateRange.preset === option.value
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
    preset: 'last30days'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };
  
  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting analytics data...');
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Detailed insights and performance metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <button
            onClick={handleRefresh}
            className="btn-outline"
            disabled={isRefreshing}
          >
            <RefreshCw className={cn('w-4 h-4 mr-2', isRefreshing && 'animate-spin')} />
            Refresh
          </button>
          <button onClick={handleExport} className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Analytics Stats */}
      <StatsCards stats={analyticsStats} />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2">
          <RevenueChart data={extendedRevenueData} />
        </div>
        
        {/* Conversion Rate */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
            <div className="text-sm text-gray-500">Last 6 weeks</div>
          </div>
          
          <div className="h-80">
            {/* Custom conversion chart would go here */}
            <div className="flex items-center justify-center h-full text-gray-500">
              Conversion Rate Chart (3.6% avg)
            </div>
          </div>
        </div>
        
        {/* Traffic Sources */}
        <CategoryChart data={trafficSourceData} />
        
        {/* User Growth */}
        <UserGrowthChart data={conversionData} />
        
        {/* Performance Metrics */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Page Load Time</p>
                <p className="text-xs text-gray-500">Average response time</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">1.2s</p>
                <p className="text-xs text-success-600">↓ 15% faster</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Bounce Rate</p>
                <p className="text-xs text-gray-500">Percentage of single-page sessions</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">32.4%</p>
                <p className="text-xs text-error-600">↑ 2.1% higher</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Session Duration</p>
                <p className="text-xs text-gray-500">Average time on site</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">4m 32s</p>
                <p className="text-xs text-success-600">↑ 8.3% longer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {[
              { page: '/dashboard', views: 12543, rate: '+12%' },
              { page: '/products', views: 8765, rate: '+8%' },
              { page: '/analytics', views: 6432, rate: '+15%' },
              { page: '/users', views: 5421, rate: '+5%' },
              { page: '/settings', views: 3210, rate: '-2%' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-900">{item.page}</span>
                <div className="text-right">
                  <span className="text-sm text-gray-600">{item.views.toLocaleString()}</span>
                  <span className={cn(
                    'ml-2 text-xs',
                    item.rate.startsWith('+') ? 'text-success-600' : 'text-error-600'
                  )}>
                    {item.rate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Referrers */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Referrers</h3>
          <div className="space-y-3">
            {[
              { source: 'google.com', visits: 4321, percentage: 35 },
              { source: 'facebook.com', visits: 2876, percentage: 23 },
              { source: 'twitter.com', visits: 1654, percentage: 13 },
              { source: 'linkedin.com', visits: 987, percentage: 8 },
              { source: 'Direct', visits: 2543, percentage: 21 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-900">{item.source}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {item.visits.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
