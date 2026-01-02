import { Card } from '../../../../components/ui/Card';
import { TrendingUp } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip 
} from 'recharts';

interface RadarDataPoint {
    subject: string;
    A: number;
}

export const OpportunityRadar = ({ data }: { data: RadarDataPoint[] }) => (
    <Card className="p-6 h-100 flex flex-col">
        <h3 className="font-bold text-text-main flex items-center gap-2 mb-4 text-lg">
            <TrendingUp className="text-cyan-500" size={24} /> Business Health Radar
        </h3>
        
        <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="var(--border-color)" strokeOpacity={0.5} />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar 
                        name="My Business" 
                        dataKey="A" 
                        stroke="#06b6d4" 
                        strokeWidth={2}
                        fill="#06b6d4" 
                        fillOpacity={0.3} 
                    />
                    <Tooltip 
                        cursor={false}
                        contentStyle={{ 
                            backgroundColor: 'var(--bg-card)', 
                            borderColor: 'var(--border-color)', 
                            borderRadius: '12px', 
                            color: 'var(--text-main)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    </Card>
);