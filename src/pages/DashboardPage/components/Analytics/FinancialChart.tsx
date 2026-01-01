import { Card } from '../../../../components/ui/Card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { AggregatedDataPoint } from '../../../../utils/analyticsHelpers';

export const FinancialChart = ({ data }: { data: AggregatedDataPoint[] }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="flex items-center justify-center h-100">
        <p className="text-text-muted">No data found for this period</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-text-main text-lg">Performance Overview</h3>
      </div>

      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
            
            <XAxis
              dataKey="name"
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
              minTickGap={30} 
            />

            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />

            <Tooltip
              cursor={{ fill: 'var(--bg-input)', opacity: 0.4 }}
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                borderRadius: '12px',
                color: 'var(--text-main)',
              }}
              formatter={(value: number | undefined) => [`$${value?.toLocaleString() ?? '0'}`, '']}
            />

            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            <Bar dataKey="revenue" name="Revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={60} />
            <Bar dataKey="expenses" name="Expenses" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};