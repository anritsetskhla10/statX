import { useState, useMemo } from 'react';
import { filterDataByDate, aggregateData,type TimeRange,type TimeInterval } from '../../../utils/analyticsHelpers';
import type { AnalyticsData } from '../hooks/useDashboardData'; 
import { FilterBar } from './Analytics/FilterBar';
import { SummaryCards } from './Analytics/SummaryCards';
import { FinancialChart } from './Analytics/FinancialChart';
import { TransactionTable } from './Analytics/TransactionTable';

interface AnalyticsTabProps {
  data: {
    rawData: AnalyticsData[];
  } | null;
}

interface SummaryStats {
  revenue: number;
  expenses: number;
  profit: number;
}

export const AnalyticsTab = ({ data }: AnalyticsTabProps) => {
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

  const aggregatedData = useMemo(() => {
    return aggregateData(filteredTransactions, interval);
  }, [filteredTransactions, interval]);


  const summary = useMemo(() => {
    return filteredTransactions.reduce<SummaryStats>((acc, curr) => ({
      revenue: acc.revenue + (curr.revenue || 0),
      expenses: acc.expenses + (curr.expenses || 0),
      profit: acc.profit + (curr.net_profit || 0),
    }), { revenue: 0, expenses: 0, profit: 0 });
  }, [filteredTransactions]);

  if (!data) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Filters */}
      <FilterBar 
        range={range} 
        setRange={handleRangeChange}
        interval={interval} 
        setInterval={setInterval}
        customStart={customStart} 
        setCustomStart={setCustomStart}
        customEnd={customEnd} 
        setCustomEnd={setCustomEnd}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCards 
            revenue={summary.revenue}
            expenses={summary.expenses}
            profit={summary.profit}
        />
      </div>

      {/* Chart Section */}
      <div className="w-full">
         <FinancialChart data={aggregatedData} />
      </div>

      {/* Detailed Aggregated Table */}
      <TransactionTable data={aggregatedData} />

    </div>
  );
};