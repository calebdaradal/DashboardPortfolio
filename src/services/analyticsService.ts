import { AnalyticsData, DashboardMetrics, MetricsTile, DateRange } from '@/types';

// Mock data for analytics service
const mockDashboardMetrics: DashboardMetrics = {
  totalUsers: 2543,
  totalRevenue: 45231,
  totalOrders: 1234,
  totalProducts: 892,
  userGrowth: 12.5,
  revenueGrowth: 8.2,
  orderGrowth: -2.1,
  productGrowth: 5.7
};

const mockAnalyticsData: AnalyticsData[] = [
  {
    period: '2024-01',
    users: 450,
    revenue: 45000,
    orders: 120,
    conversionRate: 3.2,
    pageViews: 12500,
    newUsers: 180,
    returningUsers: 270
  },
  {
    period: '2024-02',
    users: 520,
    revenue: 52000,
    orders: 135,
    conversionRate: 3.8,
    pageViews: 14200,
    newUsers: 210,
    returningUsers: 310
  },
  {
    period: '2024-03',
    users: 480,
    revenue: 48000,
    orders: 125,
    conversionRate: 2.9,
    pageViews: 13100,
    newUsers: 190,
    returningUsers: 290
  }
];

class AnalyticsService {

  async getDashboardMetrics(_dateRange?: DateRange): Promise<DashboardMetrics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would be:
    // return apiClient.get<DashboardMetrics>(`${this.baseURL}/dashboard`, {
    //   startDate: dateRange?.startDate.toISOString(),
    //   endDate: dateRange?.endDate.toISOString()
    // });
    
    return mockDashboardMetrics;
  }

  async getAnalyticsData(
    _startDate: Date,
    _endDate: Date,
    _granularity: 'day' | 'week' | 'month' = 'month'
  ): Promise<AnalyticsData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app:
    // return apiClient.get<AnalyticsData[]>(`${this.baseURL}/data`, {
    //   startDate: startDate.toISOString(),
    //   endDate: endDate.toISOString(),
    //   granularity
    // });
    
    return mockAnalyticsData;
  }

  async getRevenueData(_dateRange: DateRange): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock revenue data based on date range
    const data = [
      { date: 'Jan', revenue: 45, target: 50 },
      { date: 'Feb', revenue: 52, target: 55 },
      { date: 'Mar', revenue: 48, target: 50 },
      { date: 'Apr', revenue: 61, target: 60 },
      { date: 'May', revenue: 55, target: 58 },
      { date: 'Jun', revenue: 67, target: 65 }
    ];
    
    return data;
  }

  async getUserGrowthData(_dateRange: DateRange): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      { date: 'Week 1', newUsers: 120, returningUsers: 340 },
      { date: 'Week 2', newUsers: 132, returningUsers: 356 },
      { date: 'Week 3', newUsers: 145, returningUsers: 378 },
      { date: 'Week 4', newUsers: 158, returningUsers: 392 }
    ];
  }

  async getTopPages(_dateRange: DateRange, _limit: number = 10): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { page: '/dashboard', views: 12543, uniqueViews: 8765, avgTimeOnPage: 245 },
      { page: '/products', views: 8765, uniqueViews: 6432, avgTimeOnPage: 189 },
      { page: '/analytics', views: 6432, uniqueViews: 4321, avgTimeOnPage: 312 },
      { page: '/users', views: 5421, uniqueViews: 3876, avgTimeOnPage: 167 },
      { page: '/settings', views: 3210, uniqueViews: 2543, avgTimeOnPage: 98 }
    ];
  }

  async getTrafficSources(_dateRange: DateRange): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { source: 'Organic Search', sessions: 4521, percentage: 45.2 },
      { source: 'Direct', sessions: 2876, percentage: 28.8 },
      { source: 'Social Media', sessions: 1543, percentage: 15.4 },
      { source: 'Email', sessions: 876, percentage: 8.8 },
      { source: 'Referral', sessions: 234, percentage: 2.3 }
    ];
  }

  async getConversionFunnel(_dateRange: DateRange): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return [
      { stage: 'Visitors', count: 10000, percentage: 100 },
      { stage: 'Product Views', count: 6500, percentage: 65 },
      { stage: 'Add to Cart', count: 1950, percentage: 19.5 },
      { stage: 'Checkout', count: 780, percentage: 7.8 },
      { stage: 'Purchase', count: 390, percentage: 3.9 }
    ];
  }

  async getMetricsTiles(_dateRange: DateRange): Promise<MetricsTile[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: '$124,563',
        change: 12.5,
        changeType: 'positive',
        icon: 'TrendingUp',
        description: 'vs last period',
        trend: [
          { date: '1', value: 45 },
          { date: '2', value: 52 },
          { date: '3', value: 48 },
          { date: '4', value: 61 },
          { date: '5', value: 55 },
          { date: '6', value: 67 }
        ]
      },
      {
        id: 'conversion',
        title: 'Conversion Rate',
        value: '3.6%',
        change: 8.2,
        changeType: 'positive',
        icon: 'Target',
        description: 'avg conversion rate'
      },
      {
        id: 'aov',
        title: 'Avg Order Value',
        value: '$67.32',
        change: -2.1,
        changeType: 'negative',
        icon: 'DollarSign',
        description: 'per transaction'
      },
      {
        id: 'ltv',
        title: 'Customer LTV',
        value: '$234.56',
        change: 15.7,
        changeType: 'positive',
        icon: 'Users',
        description: 'lifetime value'
      }
    ];
  }

  async exportAnalyticsData(
    _dateRange: DateRange,
    _format: 'csv' | 'excel' | 'pdf' = 'csv'
  ): Promise<Blob> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app:
    // const response = await apiClient.request<Blob>(`${this.baseURL}/export`, {
    //   method: 'POST',
    //   body: { startDate: dateRange.startDate, endDate: dateRange.endDate, format },
    //   headers: { 'Accept': 'application/octet-stream' }
    // });
    
    // Mock CSV content
    const csvContent = 'Date,Revenue,Users,Orders\n2024-01,45000,450,120\n2024-02,52000,520,135\n2024-03,48000,480,125';
    return new Blob([csvContent], { type: 'text/csv' });
  }

  async getRealTimeMetrics(): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      activeUsers: 1429,
      currentSessions: 234,
      pageViewsToday: 5678,
      revenueToday: 12543,
      ordersToday: 45,
      conversionRateToday: 3.8
    };
  }
}

export const analyticsService = new AnalyticsService();
