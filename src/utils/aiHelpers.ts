import type { AnalyticsData } from '../pages/DashboardPage/hooks/useDashboardData';

// Forecasting using Linear Regression
export const generateForecast = (data: AnalyticsData[], daysToForecast = 7) => {

  const recentData = data.slice(-30);
  
  const n = recentData.length;
  if (n === 0) return [];

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
  const points = recentData.map((item, index) => {
    const x = index;
    const y = item.revenue;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
    return { name: new Date(item.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}), actual: y, forecast: null };
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Creating forecast points for the next specified days
  const lastDate = new Date(recentData[recentData.length - 1].date);
  
  const forecastPoints = [];
  for (let i = 1; i <= daysToForecast; i++) {
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + i);
    
    const x = n + i;
    const predictedY = slope * x + intercept;

    forecastPoints.push({
      name: nextDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}),
      actual: null,
      forecast: Math.max(0, Math.round(predictedY)) 
    });
  }

  return [...points, ...forecastPoints];
};

//Anomaly Detection
export const detectAnomalies = (data: AnalyticsData[]) => {
  if (data.length === 0) return [];
  
  const revenues = data.map(d => d.revenue);
  const mean = revenues.reduce((a, b) => a + b, 0) / revenues.length;
  const stdDev = Math.sqrt(revenues.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / revenues.length);
  
  // Define a threshold for anomalies
  const threshold = 1.5;

  return data.map(item => {
    const isSpike = item.revenue > mean + (threshold * stdDev);
    const isDrop = item.revenue < mean - (threshold * stdDev);
    
    if (isSpike || isDrop) {
      return {
        date: item.date,
        value: item.revenue,
        type: isSpike ? 'spike' : 'drop',
        diff: Math.round(((item.revenue - mean) / mean) * 100)
      };
    }
    return null;
  }).filter(Boolean) as { date: string, value: number, type: 'spike' | 'drop', diff: number }[];
};

// Smart Budget Allocator
export const getBudgetRecommendations = (data: AnalyticsData[]) => {
  const platformStats = new Map<string, { revenue: number, expenses: number }>();

  data.forEach(d => {
    const p = d.platform || 'Other';
    const curr = platformStats.get(p) || { revenue: 0, expenses: 0 };
    platformStats.set(p, { revenue: curr.revenue + d.revenue, expenses: curr.expenses + d.expenses });
  });

  const platforms = Array.from(platformStats.entries()).map(([name, val]) => ({
    name,
    roas: val.expenses > 0 ? val.revenue / val.expenses : 0
  })).sort((a, b) => b.roas - a.roas);

  if (platforms.length < 2) return null;

  const best = platforms[0];
  const worst = platforms[platforms.length - 1];

  return {
    takeFrom: worst,
    giveTo: best,
    potentialGain: Math.round((best.roas - worst.roas) * 10) 
  };
};

// Radar Data Preparation 
export const getRadarData = (data: AnalyticsData[]) => {
  // Key Metrics: Profitability, Growth, Retention, Efficiency, Stability
  const totalRev = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExp = data.reduce((acc, curr) => acc + curr.expenses, 0);
  const profitMargin = totalRev > 0 ? ((totalRev - totalExp) / totalRev) * 100 : 0;
  
  // Growth Rate 
  const midPoint = Math.floor(data.length / 2);
  const recentRev = data.slice(midPoint).reduce((a, c) => a + c.revenue, 0);
  const oldRev = data.slice(0, midPoint).reduce((a, c) => a + c.revenue, 0);
  const growth = oldRev > 0 ? ((recentRev - oldRev) / oldRev) * 100 : 0;

  return [
    { subject: 'Profitability', A: Math.min(100, profitMargin * 2), fullMark: 100 }, 
    { subject: 'Growth', A: Math.min(100, Math.max(0, growth + 50)), fullMark: 100 },
    { subject: 'Retention', A: 75, fullMark: 100 },
    { subject: 'Efficiency', A: Math.min(100, (totalRev / (totalExp || 1)) * 10), fullMark: 100 }, 
    { subject: 'Stability', A: 65, fullMark: 100 },
  ];
};

export const getPlatformROASList = (data: AnalyticsData[]) => {
  const map = new Map<string, { revenue: number; expenses: number }>();

  data.forEach((item) => {
    const p = item.platform || 'Other';
    if (!map.has(p)) map.set(p, { revenue: 0, expenses: 0 });
    
    const entry = map.get(p)!;
    entry.revenue += item.revenue;
    entry.expenses += item.expenses;
  });


  return Array.from(map.entries())
    .map(([name, val]) => ({
      name,
      roas: val.expenses > 0 ? val.revenue / val.expenses : 0, 
      revenue: val.revenue
    }))
    .sort((a, b) => b.revenue - a.revenue);
};