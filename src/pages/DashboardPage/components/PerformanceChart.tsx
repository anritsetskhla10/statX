import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../../../components/ui/Card';

export interface ChartItem {
  name: string;
  revenue: number;
  expenses: number;
  users: number;
}

interface PerformanceChartProps {
  data: ChartItem[];
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <Card className="lg:col-span-2 min-h-100 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-main">Financial Performance</h3>
        <div className="flex gap-4 text-xs font-medium">
        </div>
      </div>

      <div className="flex-1 w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {/* Revenue Gradient */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
              {/* Expenses Gradient */}
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} vertical={false} />
            
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'var(--text-muted)', fontSize: 12}} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'var(--text-muted)', fontSize: 12}} 
                tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '12px', color: 'var(--text-main)' }}
                itemStyle={{ color: 'var(--text-main)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle"/>

            {/* Revenue Area */}
            <Area 
                name="Revenue"
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--primary)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
            />

            {/* Expenses Area */}
            <Area 
                name="Expenses"
                type="monotone" 
                dataKey="expenses" 
                stroke="#f97316" 
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