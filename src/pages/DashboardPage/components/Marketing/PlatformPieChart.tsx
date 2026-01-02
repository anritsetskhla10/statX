import { Card } from '../../../../components/ui/Card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { PlatformMetric } from '../../../../utils/marketingHelpers';

const COLORS = ['#00d4ff', '#a855f7', '#f97316', '#10b981', '#ef4444'];

export const PlatformPieChart = ({ data }: { data: PlatformMetric[] }) => {
  return (
    <Card className="flex flex-col h-100">
      <h3 className="font-bold text-text-main mb-6 text-lg">Revenue Share by Platform</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="revenue"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', color: 'var(--text-main)' }}
               itemStyle={{ color: 'var(--text-main)' }}
               formatter={(value: number | undefined) => value ? [`$${value.toLocaleString()}`, 'Revenue'] : ['', 'Revenue']}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};