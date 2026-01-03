import { useMemo } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Brain, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';

interface ForecastData {
  name: string;
  actual: number | null;
  forecast: number | null;
}

export const RevenueForecast = ({ data }: { data: ForecastData[] }) => {
  const stats = useMemo(() => {
    const forecastItems = data.filter(d => d.forecast !== null && d.actual === null);
    const totalForecast = forecastItems.reduce((acc, curr) => acc + (curr.forecast || 0), 0);

    const lastActualItem = [...data].reverse().find(d => d.actual !== null);
    const lastActual = lastActualItem?.actual || 0;

    const firstForecast = forecastItems.length > 0 ? forecastItems[0].forecast || 0 : 0;

    const isGrowing = firstForecast >= lastActual;
    const diffPercent = lastActual > 0 
      ? Math.round(((firstForecast - lastActual) / lastActual) * 100) 
      : 0;

    return { totalForecast, isGrowing, diffPercent };
  }, [data]);

  const todayIndex = data.findIndex(d => d.actual !== null && data[data.indexOf(d) + 1]?.actual === null);
  const todayLabel = todayIndex !== -1 ? data[todayIndex].name : '';

  return (
    <Card className="p-6 h-100 flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
         <div>
            <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
              <Brain className="text-purple-500" size={24} /> AI Revenue Prediction
            </h3>
            <p className="text-text-muted text-xs mt-1">Based on linear regression model</p>
         </div>
         
         <div className="text-right">
            <p className="text-xs text-text-muted uppercase font-bold mb-1">Proj. Total (Next 7 Days)</p>
            <div className="flex items-center justify-end gap-2">
                <span className="text-2xl font-bold text-text-main">
                    ${stats.totalForecast.toLocaleString()}
                </span>
                {stats.diffPercent !== 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 border ${
                        stats.isGrowing 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                        {stats.isGrowing ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                        {Math.abs(stats.diffPercent)}%
                    </span>
                )}
            </div>
         </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
            <XAxis 
                dataKey="name" 
                hide={false} 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'var(--text-muted)', fontSize: 10}} 
                interval="preserveStartEnd"
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(v) => `$${v}`}
              width={40}
            />
            
            <Tooltip 
              cursor={{ stroke: 'var(--text-muted)', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderColor: 'var(--border-color)', 
                  borderRadius: '12px', 
                  color: 'var(--text-main)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} 
              formatter={(val: number | undefined, name?: string) => [
                  `$${val?.toLocaleString() ?? 0}`, 
                  name === 'forecast' ? 'AI Prediction' : 'Actual Revenue'
              ]}
              labelStyle={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}
            />
            {todayLabel && (
                <ReferenceLine x={todayLabel} stroke="var(--text-muted)" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: 'var(--text-muted)', fontSize: 10 }} />
            )}

            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#06b6d4" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: 'var(--bg-card)' }} 
              activeDot={{ r: 6 }}
              name="Actual" 
              connectNulls={true} 
            />
            
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#a855f7" 
              strokeWidth={3} 
              strokeDasharray="5 5" 
              dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: 'var(--bg-card)' }} 
              name="Forecast" 
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};