import type { AnalyticsData } from '../pages/DashboardPage/hooks/useDashboardData';
import { getBucketKey, type TimeInterval } from './analyticsHelpers';

export interface PlatformMetric {
  name: string;
  revenue: number;
  expenses: number;
  roi: number;
  roas: number;
  [key: string]: string | number;
}

export interface UserStatsPoint {
  name: string;
  newUsers: number;
  returningUsers: number;
  sortTime: number;
}

export const calculatePlatformMetrics = (data: AnalyticsData[]): PlatformMetric[] => {
  const map = new Map<string, { revenue: number; expenses: number }>();

  data.forEach((item) => {
    const platform = item.platform || 'Other';
    if (!map.has(platform)) {
      map.set(platform, { revenue: 0, expenses: 0 });
    }
    const entry = map.get(platform)!;
    entry.revenue += item.revenue || 0;
    entry.expenses += item.expenses || 0;
  });

  return Array.from(map.entries()).map(([name, { revenue, expenses }]) => {
    const roas = expenses > 0 ? revenue / expenses : 0;
    
    const roi = expenses > 0 ? ((revenue - expenses) / expenses) * 100 : 0;

    return {
      name,
      revenue,
      expenses,
      roas: parseFloat(roas.toFixed(2)),
      roi: parseFloat(roi.toFixed(1)),
    };
  }).sort((a, b) => b.revenue - a.revenue); 
};

export const aggregateUserStats = (data: AnalyticsData[], interval: TimeInterval): UserStatsPoint[] => {
  const map = new Map<string, UserStatsPoint>();

  data.forEach((item) => {
    const dateObj = new Date(item.date);
    const { key, label, sortTime } = getBucketKey(dateObj, interval);

    if (!map.has(key)) {
      map.set(key, {
        name: label,
        newUsers: 0,
        returningUsers: 0,
        sortTime: sortTime,
      });
    }

    const entry = map.get(key)!;
    
    if (item.new_user) {
        entry.newUsers += 1; 
    } else {
        entry.returningUsers += 1;
    }
  });

  return Array.from(map.values()).sort((a, b) => a.sortTime - b.sortTime);
};