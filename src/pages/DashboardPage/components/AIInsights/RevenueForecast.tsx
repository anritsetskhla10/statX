import { Card } from '../../../../components/ui/Card';
import { Brain } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

interface ForecastData {
  name: string;
  actual: number | null;
  forecast: number | null;
}

export const RevenueForecast = ({ data }: { data: ForecastData[] }) => (
  <Card className="p-6 h-100 flex flex-col">
    <div className="flex justify-between items-center mb-6">
       <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
         <Brain className="text-purple-500" size={24} /> AI Revenue Prediction
       </h3>
       <span className="text-xs font-medium bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
         Next 7 Days
       </span>
    </div>
    
    <div className="flex-1 w-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
          <XAxis dataKey="name" hide />
          <YAxis 
            stroke="var(--text-muted)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip 
            cursor={{ stroke: 'var(--text-muted)', strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{ 
                backgroundColor: 'var(--bg-card)', 
                borderColor: 'var(--border-color)', 
                borderRadius: '12px', 
                color: 'var(--text-main)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }} 
            formatter={(val: number | undefined, name: string | undefined) => [
                `$${val ?? 0}`, 
                name === 'forecast' ? 'AI Prediction' : 'Actual Revenue'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#06b6d4" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: 'var(--bg-card)' }} 
            activeDot={{ r: 6 }}
            name="Actual" 
          />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#a855f7" 
            strokeWidth={3} 
            strokeDasharray="5 5" 
            dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: 'var(--bg-card)' }} 
            name="Forecast" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);