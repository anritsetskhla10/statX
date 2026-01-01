import { useState, useCallback, useEffect, useMemo } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';

export interface AnalyticsData {
  id: number;
  date: string;
  customer_name: string;
  revenue: number;
  expenses: number;
  net_profit: number;
  refund_amount: number;
  users: number;
  new_user: boolean;
  platform: string;
  campaign_name: string;
  category: string;
  status: string;
  region: string;
}

export const useDashboardData = () => {
  const { user } = useAuthStore();
  const [rawData, setRawData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;
      
      if (data) {
        setRawData(data as AnalyticsData[]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const processedData = useMemo(() => {
    if (rawData.length === 0) return null;

    const totalRevenue = rawData.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
    const totalExpenses = rawData.reduce((acc, curr) => acc + (curr.expenses || 0), 0);
    const totalNetProfit = rawData.reduce((acc, curr) => acc + (curr.net_profit || 0), 0);
    const totalUsers = rawData.reduce((acc, curr) => acc + (curr.users || 0), 0);
    const totalRefunds = rawData.reduce((acc, curr) => acc + (curr.refund_amount || 0), 0);
    
    const profitMargin = totalRevenue > 0 ? ((totalNetProfit / totalRevenue) * 100).toFixed(1) : 0;

    const stats = [
      { label: "Total Revenue", value: totalRevenue, trend: 0, type: 'currency' as const, progress: 85 },
      { label: "Total Expenses", value: totalExpenses, trend: 0, type: 'currency' as const, progress: totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0 },
      { label: "Net Profit", value: totalNetProfit, trend: Number(profitMargin), type: 'currency' as const, progress: Number(profitMargin) },
      { label: "Active Users", value: totalUsers, trend: 0, type: 'number' as const, progress: 70 },
      { label: "Total Refunds", value: totalRefunds, trend: 0, type: 'currency' as const, progress: totalRevenue > 0 ? (totalRefunds / totalRevenue) * 100 : 0 }
    ];
    const chartMap = new Map<string, { name: string; revenue: number; expenses: number; profit: number; rawDate: number }>();

    rawData.forEach((item) => {
      const dateObj = new Date(item.date);
      const dateKey = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (chartMap.has(dateKey)) {
        const existing = chartMap.get(dateKey)!;
        existing.revenue += item.revenue || 0;
        existing.expenses += item.expenses || 0;
        existing.profit += item.net_profit || 0;
      } else {
        chartMap.set(dateKey, {
          name: dateKey,
          revenue: item.revenue || 0,
          expenses: item.expenses || 0,
          profit: item.net_profit || 0,
          rawDate: dateObj.getTime()
        });
      }
    });

    const chartData = Array.from(chartMap.values())
      .sort((a, b) => a.rawDate - b.rawDate)
      .map(({ name, revenue, expenses, profit }) => ({ name, revenue, expenses, profit }));


    const platformMap = new Map<string, number>();
    rawData.forEach(item => {
       const name = item.platform || "Other";
       const currentVal = platformMap.get(name) || 0;
       platformMap.set(name, currentVal + (item.revenue || 0));
    });
    
    const platformData = Array.from(platformMap, ([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);


    const categoryMap = new Map<string, number>();
    rawData.forEach(item => {
       const name = item.category || "Uncategorized";
       const currentVal = categoryMap.get(name) || 0;
       categoryMap.set(name, currentVal + (item.revenue || 0));
    });

    const categoryData = Array.from(categoryMap, ([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);


    const campaignMap = new Map<string, { revenue: number, count: number }>();
    rawData.forEach(item => {
       const name = item.campaign_name || "Organic";
       const existing = campaignMap.get(name) || { revenue: 0, count: 0 };
       campaignMap.set(name, { 
           revenue: existing.revenue + (item.revenue || 0),
           count: existing.count + 1
       });
    });

    const campaignData = Array.from(campaignMap, ([name, { revenue, count }]) => ({ 
        name, 
        revenue, 
        count,
        performance: Math.min(100, Math.round((revenue / 5000) * 100)) 
    })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);


    const statusMap = new Map<string, number>();
    rawData.forEach(item => {
        const status = item.status || "Unknown";
        statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });

    const funnelData = Array.from(statusMap, ([name, value]) => ({ 
        name, 
        value,
        fill: name === 'Completed' ? '#10b981' : name === 'Pending' ? '#f59e0b' : '#ef4444'
    })).sort((a, b) => b.value - a.value);

    const recentTransactions = [...rawData].reverse().slice(0, 5);

    return { 
        stats, 
        chartData, 
        recentTransactions, 
        platformData,
        categoryData,
        campaignData, 
        funnelData,   
        rawData,
        hasData: true 
    };
  }, [rawData]);

  return { processedData, isLoading, refetch: fetchData };
};