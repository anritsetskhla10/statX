import type { AnalyticsData } from '../pages/DashboardPage/hooks/useDashboardData';

export type TimeRange = 'today' | '7days' | '30days' | 'thisMonth' | 'thisYear' | 'custom';
export type TimeInterval = 'hourly' | 'daily' | 'weekly' | 'monthly';

export interface AggregatedDataPoint {
  name: string;
  dateKey: string;
  revenue: number;
  expenses: number;
  profit: number;
  sortTime: number;
}

export const filterDataByDate = (
  data: AnalyticsData[],
  range: TimeRange,
  customStart?: string,
  customEnd?: string
) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  return data.filter((item) => {
    const date = new Date(item.date).getTime();

    switch (range) {
      case 'today':
        return date >= todayStart;
      case '7days': {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        return date >= sevenDaysAgo.getTime();
      }
      case '30days': {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return date >= thirtyDaysAgo.getTime();
      }
      case 'thisMonth': {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        return date >= startOfMonth;
      }
      case 'thisYear': {
        const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
        return date >= startOfYear;
      }
      case 'custom': {
        if (!customStart || !customEnd) return true;
        const start = new Date(customStart).getTime();
        const end = new Date(customEnd).setHours(23, 59, 59, 999);
        return date >= start && date <= end;
      }
      default:
        return true;
    }
  });
};


export const getBucketKey = (date: Date, aggregation: TimeInterval) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Hourly
  if (aggregation === 'hourly') {
    const hour = date.getHours();
    return { 
      key: `${year}-${month}-${day}-${hour}`, 
      sortTime: new Date(year, month, day, hour).getTime(),
      label: date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
    };
  }

  // Weekly
  if (aggregation === 'weekly') {
    const d = new Date(date);
    const dayOfWeek = d.getDay();
    const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    
    return { 
      key: `week-${d.getTime()}`, 
      sortTime: d.getTime(),
      label: `Week of ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    };
  }

  // Monthly
  if (aggregation === 'monthly') {
    return { 
      key: `month-${year}-${month}`, 
      sortTime: new Date(year, month, 1).getTime(),
      label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
  }

  //  Daily 
  return { 
    key: `${year}-${month}-${day}`, 
    sortTime: new Date(year, month, day).getTime(),
    label: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};

export const aggregateData = (data: AnalyticsData[], interval: TimeInterval): AggregatedDataPoint[] => {
  const groupedMap = new Map<string, AggregatedDataPoint>();

  data.forEach((item) => {
    const dateObj = new Date(item.date);
    const { key, sortTime, label } = getBucketKey(dateObj, interval);

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        name: label,
        dateKey: key,
        revenue: 0,
        expenses: 0,
        profit: 0,
        sortTime: sortTime
      });
    }

    const entry = groupedMap.get(key)!;
    entry.revenue += item.revenue || 0;
    entry.expenses += item.expenses || 0;
    entry.profit += item.net_profit || 0;
  });

  return Array.from(groupedMap.values()).sort((a, b) => a.sortTime - b.sortTime);
};