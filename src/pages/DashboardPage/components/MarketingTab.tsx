import { useState, useMemo } from 'react';
import { filterDataByDate, type TimeRange,type TimeInterval } from '../../../utils/analyticsHelpers';
import { calculatePlatformMetrics, aggregateUserStats } from '../../../utils/marketingHelpers';
import type { AnalyticsData } from '../hooks/useDashboardData'; 
import { FilterBar } from './Analytics/FilterBar'; 
import { PlatformCards } from './Marketing/PlatformCards';
import { PlatformPieChart } from './Marketing/PlatformPieChart';
import { UserAcquisitionChart } from './Marketing/UserAcquisitionChart';

interface MarketingTabProps {
  data: {
    rawData: AnalyticsData[];
  } | null;
}

export const MarketingTab = ({ data }: MarketingTabProps) => {
  const [range, setRange] = useState<TimeRange>('thisMonth');
  const [interval, setInterval] = useState<TimeInterval>('daily');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');


  const handleRangeChange = (newRange: TimeRange) => {
    setRange(newRange);
    if (newRange === 'today') setInterval('hourly');
    else if (newRange === '7days') setInterval('daily');
    else if (newRange === 'thisYear') setInterval('monthly');
    else setInterval('daily');
  };

  const rawTransactions = useMemo(() => data?.rawData || [], [data]);


  const filteredTransactions = useMemo(() => {
    return filterDataByDate(rawTransactions, range, customStart, customEnd);
  }, [rawTransactions, range, customStart, customEnd]);

  const platformMetrics = useMemo(() => {
    return calculatePlatformMetrics(filteredTransactions);
  }, [filteredTransactions]);

  const userStats = useMemo(() => {
    return aggregateUserStats(filteredTransactions, interval);
  }, [filteredTransactions, interval]);

  if (!data) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Filters */}
      <FilterBar 
        range={range} setRange={handleRangeChange}
        interval={interval} setInterval={setInterval}
        customStart={customStart} setCustomStart={setCustomStart}
        customEnd={customEnd} setCustomEnd={setCustomEnd}
      />

      {/*Platform Cards */}
      <div>
         <h2 className="text-xl font-bold text-text-main mb-4">Platform Performance</h2>
         <PlatformCards data={platformMetrics} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Revenue Share (Pie) */}
          <div className="lg:col-span-1">
             <PlatformPieChart data={platformMetrics} />
          </div>

          {/* Right: New vs Returning (Bar) */}
          <div className="lg:col-span-2">
             <UserAcquisitionChart data={userStats} />
          </div>

      </div>
    </div>
  );
};