import { Card } from '../../../../components/ui/Card';
import type { PlatformMetric } from '../../../../utils/marketingHelpers';
import {  DollarSign, Activity } from 'lucide-react';

export const PlatformCards = ({ data }: { data: PlatformMetric[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((platform) => (
        <Card key={platform.name} className="p-5 flex flex-col justify-between hover:border-primary/50 transition-colors">
          <div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-text-main">{platform.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${platform.roi > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {platform.roi > 0 ? '+' : ''}{platform.roi}% ROI
                </span>
            </div>
            
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted flex items-center gap-1"><DollarSign size={14}/> Revenue</span>
                    <span className="font-semibold text-text-main">${platform.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Expenses</span>
                    <span className="text-text-main">${platform.expenses.toLocaleString()}</span>
                </div>
                <div className="h-px bg-border-color my-2"></div>
                <div className="flex justify-between items-center">
                    <span className="text-text-muted text-xs flex items-center gap-1"><Activity size={14}/> ROAS</span>
                    <span className="font-bold text-primary">{platform.roas}x</span>
                </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};