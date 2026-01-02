import { Card } from '../../../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { UserStatsPoint } from '../../../../utils/marketingHelpers';

export const UserAcquisitionChart = ({ data }: { data: UserStatsPoint[] }) => {
  return (
    <Card className="flex flex-col h-100">
      <h3 className="font-bold text-text-main mb-6 text-lg">New vs Returning Customers</h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} minTickGap={30} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
               cursor={{ fill: 'var(--bg-input)', opacity: 0.4 }}
               contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', color: 'var(--text-main)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {/* New Users  */}
            <Bar dataKey="newUsers" name="New Customers" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={40} />
            {/* Returning Users */}
            <Bar dataKey="returningUsers" name="Returning" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};