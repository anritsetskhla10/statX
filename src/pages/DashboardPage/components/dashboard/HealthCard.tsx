import { Activity, ArrowDownRight } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';

export const HealthCard = () => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#dd48c4] rounded-full blur-[80px] opacity-10"></div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#dd48c4] shadow-[0_0_10px_#dd48c4]"></span>
          <h3 className="text-text-muted text-sm font-medium uppercase tracking-wider">Business Health</h3>
        </div>
        <Activity size={20} className="text-[#dd48c4]" />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
           <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-input-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
              <path className="text-[#dd48c4] drop-shadow-[0_0_5px_rgba(221,72,196,0.5)]" strokeDasharray="96, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
           </svg>
           <span className="absolute text-text-main font-bold text-lg">96%</span>
        </div>
        <div>
          <p className="text-text-main font-semibold">Excellent</p>
          <p className="text-xs text-text-muted mt-1">Churn rate is below 2%.</p>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-2 text-xs text-[#dd48c4] bg-[#dd48c4]/10 w-fit px-3 py-1.5 rounded-full">
        <ArrowDownRight size={14} /> Churn down 0.4%
      </div>
    </Card>
  );
};