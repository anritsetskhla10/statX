import { Card } from '../../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  name: string;
  revenue: number;
  expenses: number;
}

export const PerformanceChart = ({ data }: { data: ChartDataPoint[] }) => {
  return (
    <Card className="lg:col-span-2 min-h-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-text-main">Financial Overview</h3>
        <div className="flex gap-4 text-xs font-medium">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> Revenue</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Expenses</span>
        </div>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} dy={10} fontSize={12} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} fontSize={12} />
            
            <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  backdropFilter: 'blur(8px)', 
                  border: '1px solid #334155', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)' 
                }}
                itemStyle={{ color: '#e2e8f0', fontWeight: 500 }}
              
                formatter={(value: number | undefined, name: string | undefined) => [
                  `$${value?.toLocaleString() ?? '0'}`, 
                  name ?? ''
                ]}
            />

            <Area 
                type="monotone" 
                dataKey="revenue" 
                name="Rev" 
                stroke="#22d3ee" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
            />
            <Area 
                type="monotone" 
                dataKey="expenses"
                name="Exp" 
                stroke="#a855f7" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};