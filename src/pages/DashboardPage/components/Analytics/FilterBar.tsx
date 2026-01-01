import { Filter } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import type { TimeRange, TimeInterval } from '../../../../utils/analyticsHelpers';
import { CustomSelect } from '../../../../components/ui/CustomSelect';

interface FilterBarProps {
  range: TimeRange;
  setRange: (r: TimeRange) => void;
  interval: TimeInterval;
  setInterval: (i: TimeInterval) => void;
  customStart: string;
  setCustomStart: (d: string) => void;
  customEnd: string;
  setCustomEnd: (d: string) => void;
}

export const FilterBar = ({
  range,
  setRange,
  interval,
  setInterval,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
}: FilterBarProps) => {


  const rangeOptions: { label: string; value: TimeRange }[] = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 Days', value: '7days' },
    { label: 'Last 30 Days', value: '30days' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'This Year', value: 'thisYear' },
    { label: 'Custom Range', value: 'custom' },
  ];

  const intervalOptions: { label: string; value: TimeInterval; disabled?: boolean }[] = [
    { label: 'Hourly', value: 'hourly', disabled: range === 'thisYear' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  return (
    <Card className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 z-20 relative overflow-visible"> 

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div className="flex items-center text-primary self-start sm:self-center">
            <Filter size={20} />
            <span className="ml-2 font-medium hidden md:block">Filter:</span>
        </div>
        
        <CustomSelect<TimeRange>
            value={range}
            onChange={setRange}
            options={rangeOptions}
        />

        {range === 'custom' && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 w-full sm:w-auto">
             <input 
                type="date" 
                value={customStart} 
                onChange={(e) => setCustomStart(e.target.value)} 
                className="bg-bg-input text-text-main px-3 py-2.5 rounded-lg border border-border-color text-sm outline-none focus:border-primary w-full sm:w-auto" 
            />
             <span className="text-text-muted font-bold">-</span>
             <input 
                type="date" 
                value={customEnd} 
                onChange={(e) => setCustomEnd(e.target.value)} 
                className="bg-bg-input text-text-main px-3 py-2.5 rounded-lg border border-border-color text-sm outline-none focus:border-primary w-full sm:w-auto" 
            />
          </div>
        )}
      </div>


      <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-border-color">
        <span className="text-text-muted text-sm font-medium whitespace-nowrap">Group By:</span>
        
        <div className="flex bg-bg-input rounded-lg p-1 overflow-x-auto">
          {intervalOptions.map((opt) => (
             <button
               key={opt.value}
               onClick={() => !opt.disabled && setInterval(opt.value)}
               disabled={opt.disabled}
               className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all whitespace-nowrap ${
                 interval === opt.value 
                 ? 'bg-primary text-white shadow-sm' 
                 : 'text-text-muted hover:text-text-main hover:bg-white/5'
               } disabled:opacity-30 disabled:cursor-not-allowed`}
             >
               {opt.label}
             </button>
          ))}
        </div>
      </div>

    </Card>
  );
};