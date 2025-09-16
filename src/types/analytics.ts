// Analytics Types
export interface AnalyticsData {
  period: string;
  users: number;
  revenue: number;
  orders: number;
  conversionRate: number;
  pageViews: number;
  newUsers: number;
  returningUsers: number;
}

export interface DashboardMetrics {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  userGrowth: number;
  revenueGrowth: number;
  orderGrowth: number;
  productGrowth: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
  preset?: 'today' | 'yesterday' | 'last7days' | 'last30days' | 'last90days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';
}

export interface MetricsTile {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  description?: string;
  trend?: ChartDataPoint[];
}
