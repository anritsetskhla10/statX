import { useMemo } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Activity, Info } from 'lucide-react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';

interface RadarDataPoint {
    subject: string;
    A: number; 
    fullMark: number;
}


const insertBenchmark = (data: RadarDataPoint[]) => {
    return data.map(d => ({
        ...d,
        B: Math.floor(Math.random() * (90 - 60 + 1)) + 60 
    }));
};

export const OpportunityRadar = ({ data }: { data: RadarDataPoint[] }) => {
    
    const chartData = useMemo(() => insertBenchmark(data), [data]);

    const healthScore = useMemo(() => {
        const total = data.reduce((acc, curr) => acc + curr.A, 0);
        return Math.round(total / data.length);
    }, [data]);

    return (
        <Card className="p-6 h-full flex flex-col bg-bg-card border border-border-color">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
                        <Activity className="text-cyan-500" size={24} /> Business Health
                    </h3>
                    <p className="text-xs text-text-muted mt-1">Performance vs Industry Average</p>
                </div>
                
                {/* Health Score Badge */}
                <div className="text-right">
                    <span className="text-xs font-bold text-text-muted uppercase">Health Score</span>
                    <div className={`text-2xl font-extrabold ${healthScore >= 70 ? 'text-emerald-500' : healthScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {healthScore}/100
                    </div>
                </div>
            </div>
            
            <div className="flex-1 w-full min-h-62.5 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                        <PolarGrid stroke="var(--border-color)" strokeOpacity={0.4} />
                        
                        <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }} 
                        />
                        
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        
                        {/* Industry Average Layer */}
                        <Radar 
                            name="Industry Avg" 
                            dataKey="B" 
                            stroke="#94a3b8" 
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            fill="#94a3b8" 
                            fillOpacity={0.1} 
                        />

                        {/* My Business Layer  */}
                        <Radar 
                            name="My Business" 
                            dataKey="A" 
                            stroke="#06b6d4" 
                            strokeWidth={3}
                            fill="#06b6d4" 
                            fillOpacity={0.4} 
                        />

                        <Legend 
                            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                            iconType="circle"
                        />

                        <Tooltip 
                            cursor={false}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const myVal = payload[1].value as number; 
                                    const benchmark = payload[0].value as number; 
                                    const diff = myVal - benchmark;

                                    return (
                                        <div className="bg-bg-card border border-border-color p-3 rounded-xl shadow-xl z-50">
                                            <p className="text-sm font-bold text-text-main mb-2 border-b border-border-color pb-1">
                                                {payload[0].payload.subject}
                                            </p>
                                            
                                            <div className="space-y-1 text-xs">
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-cyan-500 font-bold">You:</span>
                                                    <span className="font-mono">{myVal}%</span>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-slate-400 font-bold">Industry:</span>
                                                    <span className="font-mono">{benchmark}%</span>
                                                </div>
                                                
                                                <div className={`flex justify-between gap-4 pt-1 mt-1 border-t border-dashed border-border-color font-bold ${diff >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    <span>Diff:</span>
                                                    <span>{diff > 0 ? '+' : ''}{diff}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            
            {/* Quick Insight Text */}
            <div className="mt-2 flex items-start gap-2 text-xs text-text-muted bg-bg-input p-2 rounded-lg">
                <Info size={14} className="mt-0.5 text-cyan-500 shrink-0" />
                <p>
                    Your <span className="text-text-main font-bold">Efficiency</span> is above industry average, 
                    but <span className="text-text-main font-bold">Retention</span> needs attention to improve overall health score.
                </p>
            </div>
        </Card>
    );
};