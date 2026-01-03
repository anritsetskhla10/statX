import type { AnalyticsData } from '../pages/DashboardPage/hooks/useDashboardData';

export interface PlatformData {
  name: string;
  currentSpend: number;
  currentRevenue: number;
  roas: number;
}

export interface TargetPlan {
  platformName: string;
  currentRoas: number;
  suggestedSpendAdd: number;
  projectedRevenueAdd: number;
}

export type StrategyType = 'efficiency' | 'balanced' | 'diversified';

//  Forecasting 
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

// Anomaly Detection 
export const detectAnomalies = (data: AnalyticsData[]) => {
  if (data.length === 0) return [];
  
  const revenues = data.map(d => d.revenue);
  const mean = revenues.reduce((a, b) => a + b, 0) / revenues.length;
  const stdDev = Math.sqrt(revenues.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / revenues.length);
  
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

//  Radar Data Preparation
export const getRadarData = (data: AnalyticsData[]) => {
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
    { subject: 'Retention', A: 75, fullMark: 100 }, // დემო მონაცემი
    { subject: 'Efficiency', A: Math.min(100, (totalRev / (totalExp || 1)) * 10), fullMark: 100 }, 
    { subject: 'Stability', A: 65, fullMark: 100 },
  ];
};

// Platform ROAS List (For WhatIfSimulator)
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

// Platform Aggregates (Helper for TargetAchiever)
export const getPlatformAggregates = (data: AnalyticsData[]): PlatformData[] => {
  const map = new Map<string, { spend: number; revenue: number }>();

  data.forEach((item) => {
    const p = item.platform || 'Other';
    if (!map.has(p)) map.set(p, { spend: 0, revenue: 0 });
    
    const entry = map.get(p)!;
    entry.spend += item.expenses;
    entry.revenue += item.revenue;
  });

  return Array.from(map.entries())
    .map(([name, val]) => ({
      name,
      currentSpend: val.spend,
      currentRevenue: val.revenue,
      roas: val.spend > 0 ? val.revenue / val.spend : 0
    }))
    .sort((a, b) => b.currentSpend - a.currentSpend);
};

// Target Strategy Calculation (Core Logic for TargetAchiever)
export const calculateTargetStrategy = (
    data: AnalyticsData[], 
    targetRevenue: number,
    strategy: StrategyType = 'balanced' 
): TargetPlan[] => {
  
  const platforms = getPlatformAggregates(data);
  const currentTotalRevenue = platforms.reduce((acc, p) => acc + p.currentRevenue, 0);

  const revenueGap = targetRevenue - currentTotalRevenue;
  
  if (revenueGap <= 0) return [];

  const viablePlatforms = platforms
    .filter(p => p.roas > 1.2)
    .sort((a, b) => b.roas - a.roas);

  if (viablePlatforms.length === 0) return [];

  if (strategy === 'efficiency') {
     const bestPlatform = viablePlatforms[0];
     const requiredSpend = revenueGap / bestPlatform.roas;
     
     return [{
         platformName: bestPlatform.name,
         currentRoas: bestPlatform.roas,
         suggestedSpendAdd: requiredSpend,
         projectedRevenueAdd: revenueGap
     }];
  }

  if (strategy === 'balanced') {
      const totalWeight = viablePlatforms.reduce((acc, p) => acc + (p.roas * p.roas), 0);
      
      return viablePlatforms.map(p => {
          const weight = (p.roas * p.roas) / totalWeight; 
          const targetRevenuePart = revenueGap * weight; 
          const requiredSpend = targetRevenuePart / p.roas;

          return {
              platformName: p.name,
              currentRoas: p.roas,
              suggestedSpendAdd: requiredSpend,
              projectedRevenueAdd: targetRevenuePart
          };
      });
  }

  if (strategy === 'diversified') {
      const count = viablePlatforms.length;
      const targetRevenuePart = revenueGap / count;

      return viablePlatforms.map(p => ({
          platformName: p.name,
          currentRoas: p.roas,
          suggestedSpendAdd: targetRevenuePart / p.roas,
          projectedRevenueAdd: targetRevenuePart
      }));
  }

  return [];
};