import { DollarSign, ArrowUpRight } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';


const chartData = [40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100];

export const RevenueCard = () => {
  return (
    <Card className="lg:col-span-2 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-(--space-card) opacity-10 group-hover:opacity-20 transition-opacity">
        <DollarSign size={100} className="text-[#48dd84]" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#48dd84] shadow-[0_0_10px_#48dd84]"></span>
          <h3 className="text-text-muted text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
        </div>
        <div className="flex items-baseline gap-4 mt-2">
          <h2 className="text-4xl font-bold text-text-main">$142,390.00</h2>
          <span className="flex items-center text-[#48dd84] bg-[#48dd84]/10 px-2 py-1 rounded-md text-sm font-medium">
            <ArrowUpRight size={16} className="mr-1" /> +12.5%
          </span>
        </div>
      </div>

      <div className="mt-8 h-48 w-full flex items-end justify-between gap-2">
        {chartData.map((h, i) => (
          <div key={i} className="w-full bg-input-bg rounded-t-sm relative group/bar hover:bg-[#48dd84]/20 transition-colors cursor-pointer">
            <div 
              className="absolute bottom-0 w-full bg-linear-to-t from-[#48dd84]/10 to-[#48dd84] rounded-t-sm transition-all duration-500"
              style={{ height: `${h}%` }}
            ></div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-text-main text-bg-card text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
              ${h * 1420}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};