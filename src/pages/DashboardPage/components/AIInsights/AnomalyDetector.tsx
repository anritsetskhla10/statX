import { useState, useMemo } from 'react';
import { Card } from '../../../../components/ui/Card';
import { AlertTriangle, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine 
} from 'recharts';

interface Anomaly {
  date: string;
  type: 'spike' | 'drop';
  diff: number;
}

export const AnomalyDetector = ({ anomalies }: { anomalies: Anomaly[] }) => {
  const [filter, setFilter] = useState<'all' | 'spike' | 'drop'>('all');

  const chartData = useMemo(() => {
    return anomalies
      .filter(a => filter === 'all' || a.type === filter)
      .map(a => ({
        ...a,
        displayValue: a.type === 'drop' ? -a.diff : a.diff, 
        dateLabel: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [anomalies, filter]);

  const maxSpike = Math.max(...anomalies.filter(a => a.type === 'spike').map(a => a.diff), 0);
  const maxDrop = Math.max(...anomalies.filter(a => a.type === 'drop').map(a => a.diff), 0);

  return (
    <Card className="p-6 h-full flex flex-col bg-bg-card border border-border-color">
      
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
         <div>
            <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
               <AlertTriangle className="text-amber-500" size={24} /> Anomaly Radar
            </h3>
         </div>

         {/* Filter Buttons */}
         <div className="flex bg-bg-input p-1 rounded-lg">
            {(['all', 'spike', 'drop'] as const).map((f) => (
               <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-all flex items-center gap-1 ${
                     filter === f 
                     ? 'bg-bg-card text-text-main shadow-sm border border-border-color' 
                     : 'text-text-muted hover:text-text-main'
                  }`}
               >
                  {f === 'all' && <Filter size={12} />}
                  {f === 'spike' && <TrendingUp size={12} />}
                  {f === 'drop' && <TrendingDown size={12} />}
                  {f}
               </button>
            ))}
         </div>
      </div>

      {/* SUMMARY STATS (Top Row) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
            <div>
               <p className="text-[10px] uppercase font-bold text-text-muted">Max Spike</p>
               <p className="text-lg font-bold text-emerald-500">+{maxSpike}%</p>
            </div>
            <TrendingUp className="text-emerald-500/50" size={24} />
         </div>
         <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
            <div>
               <p className="text-[10px] uppercase font-bold text-text-muted">Max Drop</p>
               <p className="text-lg font-bold text-red-500">-{maxDrop}%</p>
            </div>
            <TrendingDown className="text-red-500/50" size={24} />
         </div>
      </div>

      {/* MAIN VISUALIZATION (Chart instead of List) */}
      <div className="flex-1 w-full min-h-50">
         {chartData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-muted text-sm opacity-60 border border-dashed border-border-color rounded-xl">
               No anomalies found for this filter.
            </div>
         ) : (
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
                  
                  <XAxis 
                     dataKey="dateLabel" 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{fill: 'var(--text-muted)', fontSize: 10}}
                     dy={10}
                  />
                  
                  <YAxis 
                     axisLine={false} 
                     tickLine={false} 
                     tick={{fill: 'var(--text-muted)', fontSize: 10}}
                     tickFormatter={(val) => `${val}%`}
                  />

                  <Tooltip
                  cursor={{ fill: 'var(--bg-input)', opacity: 0.4 }}
                  content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                     const data = payload[0].payload;
                     return (
                           <div className="bg-bg-card border border-border-color p-3 rounded-xl shadow-lg z-50 relative" style={{ backgroundColor: 'rgba(30, 41, 59, 0.95)' }}>
                              <div className="flex items-center gap-2 mb-1">
                                 <p className="text-xs text-text-muted font-bold">{data.dateLabel}</p>
                              </div>
                              <div className={`flex items-center gap-2 font-bold ${data.type === 'spike' ? 'text-emerald-500' : 'text-red-500'}`}>
                                 {data.type === 'spike' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                 <span className="text-sm">{data.type === 'spike' ? '+' : '-'}{data.diff}% Deviation</span>
                              </div>
                              <p className="text-[10px] text-text-muted mt-1 capitalize">{data.type === 'spike' ? 'Positive' : 'Negative'} Anomaly</p>
                           </div>
                     );
                  }
                  return null;
                  }}
               />
                  <ReferenceLine y={0} stroke="var(--border-color)" />

                  <Bar dataKey="displayValue" radius={[4, 4, 4, 4]}>
                     {chartData.map((entry, index) => (
                        <Cell 
                           key={`cell-${index}`} 
                           fill={entry.type === 'spike' ? '#10b981' : '#ef4444'} 
                           fillOpacity={0.8}
                        />
                     ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
         )}
      </div>
    </Card>
  );
};