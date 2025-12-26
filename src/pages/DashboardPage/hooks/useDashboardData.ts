import { useState, useCallback, useEffect, useMemo } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';

export interface AnalyticsData {
  date: string;
  revenue: number;
  expenses: number;
  net_profit: number;
  refund_amount: number;
  users: number;
  platform: string;
  campaign_name: string;
}

export const useDashboardData = () => {
  const { user } = useAuthStore();
  const [rawData, setRawData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;
      setRawData(data as AnalyticsData[]);
    } catch (err: unknown) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const processedData = useMemo(() => {
    if (rawData.length === 0) return null;

    const totalRevenue = rawData.reduce((acc, curr) => acc + (Number(curr.revenue) || 0), 0);
    const totalExpenses = rawData.reduce((acc, curr) => acc + (Number(curr.expenses) || 0), 0);
    const totalNetProfit = rawData.reduce((acc, curr) => acc + (Number(curr.net_profit) || 0), 0);
    const totalRefunds = rawData.reduce((acc, curr) => acc + (Number(curr.refund_amount) || 0), 0);
    const totalUsers = rawData.reduce((acc, curr) => acc + (Number(curr.users) || 0), 0); 

    const profitMargin = totalRevenue > 0 ? ((totalNetProfit / totalRevenue) * 100).toFixed(1) : 0;

    const stats = [
      { 
        label: "Total Revenue", 
        value: totalRevenue, 
        trend: 12.5, 
        type: 'currency', 
        progress: 85 
      },
      { 
        label: "Total Expenses", 
        value: totalExpenses, 
        trend: -5, 
        type: 'currency', 
        progress: totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0 
      },
      { 
        label: "Net Profit", 
        value: totalNetProfit, 
        trend: Number(profitMargin), 
        type: 'currency', 
        progress: Number(profitMargin) 
      },
      { 
        label: "Refunds", 
        value: totalRefunds, 
        trend: -2, 
        type: 'currency', 
        inverse: true, 
        progress: totalRevenue > 0 ? (totalRefunds / totalRevenue) * 100 : 0 
      },{
        label: "Active Users", 
        value: totalUsers, 
        trend: 8.4, 
        type: 'number', 
        progress: 70
      }
    ];

    const chartData = rawData.map(item => ({
      name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: item.revenue,
      expenses: item.expenses,
      users: item.users
    }));

    return { stats, chartData, hasData: true };
  }, [rawData]);

  return {
    rawData,
    processedData,
    isLoading,
    error,
    refetch: fetchData
  };
};