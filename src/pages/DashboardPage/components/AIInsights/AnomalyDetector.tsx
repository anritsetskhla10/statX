import { Card } from '../../../../components/ui/Card';
import { AlertTriangle } from 'lucide-react';

interface Anomaly {
  date: string;
  type: 'spike' | 'drop';
  diff: number;
}

export const AnomalyDetector = ({ anomalies }: { anomalies: Anomaly[] }) => (
  <Card className="p-6 h-100 overflow-hidden flex flex-col">
    <h3 className="font-bold text-text-main flex items-center gap-2 mb-6 text-lg">
       <AlertTriangle className="text-amber-500" size={24} /> Anomaly Detection
    </h3>
    
    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
       {anomalies.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
             <div className="bg-emerald-500/10 p-4 rounded-full mb-3">
                <AlertTriangle className="text-emerald-500" size={32} />
             </div>
             <p className="text-text-muted text-sm">No significant anomalies detected.<br/>Business is stable.</p>
          </div>
       ) : (
          anomalies.map((a, idx) => (
             <div key={idx} className={`p-4 rounded-xl border flex justify-between items-center transition-all hover:scale-[1.02] ${
                a.type === 'spike' 
                  ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10' 
                  : 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10'
             }`}>
                <div>
                   <p className="text-xs text-text-muted font-medium mb-0.5">
                      {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </p>
                   <p className="font-bold text-text-main text-sm">
                      {a.type === 'spike' ? 'Revenue Spike 🚀' : 'Revenue Drop 📉'}
                   </p>
                </div>
                <div className={`text-lg font-bold ${a.type === 'spike' ? 'text-emerald-500' : 'text-red-500'}`}>
                   {a.diff > 0 ? '+' : ''}{a.diff}%
                </div>
             </div>
          ))
       )}
    </div>
  </Card>
);