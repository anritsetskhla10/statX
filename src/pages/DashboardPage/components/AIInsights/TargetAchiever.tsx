import { useState, useMemo } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Target, TrendingUp, CheckCircle, ArrowRight, Calendar, Zap, Scale, Layers } from 'lucide-react';
import type { AnalyticsData } from '../../hooks/useDashboardData';
import { calculateTargetStrategy,type StrategyType } from '../../../../utils/aiHelpers'; 

interface TargetProps {
    rawData: AnalyticsData[];
}

export const TargetAchiever = ({ rawData }: TargetProps) => {

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
    const [startDate, setStartDate] = useState<string>(firstDay);
    const [endDate, setEndDate] = useState<string>(lastDay);

    const filteredData = useMemo(() => {
        if (!startDate || !endDate) return rawData;
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        return rawData.filter(item => {
            const date = new Date(item.date).getTime();
            return date >= start && date <= end;
        });
    }, [rawData, startDate, endDate]);

    const currentRevenue = useMemo(() => {
        return filteredData.reduce((acc, curr) => acc + curr.revenue, 0);
    }, [filteredData]);

    const [targetVal, setTargetVal] = useState<string>('');
    
    const [activeStrategy, setActiveStrategy] = useState<StrategyType>('balanced');

    // Derive the default target value if not explicitly set by user
    const displayTargetVal = targetVal || (currentRevenue > 0 ? Math.round(currentRevenue * 1.2).toString() : '');

    const targetRevenue = Number(targetVal) || 0;
    const gap = targetRevenue - currentRevenue;
    const progress = targetRevenue > 0 ? Math.min(100, Math.max(0, (currentRevenue / targetRevenue) * 100)) : 0;

    const strategyPlan = useMemo(() => {
        return calculateTargetStrategy(filteredData, targetRevenue, activeStrategy);
    }, [filteredData, targetRevenue, activeStrategy]);

    const totalRequiredBudget = strategyPlan.reduce((acc, s) => acc + s.suggestedSpendAdd, 0);

    return (
        <Card className="p-6 bg-bg-card border border-border-color h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
                    <Target className="text-red-500" size={24} /> AI Target Achiever
                </h3>
                {gap <= 0 && currentRevenue > 0 && (
                    <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle size={12} /> Target Reached
                    </span>
                )}
            </div>

            <div className="space-y-5 mb-6">
                
                {/* Date Picker */}
                <div>
                    <label className="text-xs font-bold text-text-muted uppercase mb-2 flex items-center gap-1">
                        <Calendar size={14}/> Analysis Period
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full bg-bg-input text-text-main border border-border-color rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                        <span className="text-text-muted font-bold">-</span>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full bg-bg-input text-text-main border border-border-color rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Revenue Inputs */}
                <div>
                    <div className="flex justify-between text-xs font-bold text-text-muted uppercase mb-2">
                        <span>Current Revenue</span>
                        <span>Goal</span>
                    </div>
                    <div className="h-4 bg-bg-input rounded-full overflow-hidden relative mb-4">
                        <div 
                            className="h-full bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-500 relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-xl font-bold text-text-muted">
                            ${currentRevenue.toLocaleString()}
                        </div>
                        <ArrowRight className="text-text-muted" />
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
                            <input 
                                type="text"
                                value={displayTargetVal}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (/^\d*$/.test(v)) setTargetVal(v);
                                }}
                                className="w-full bg-bg-input border border-border-color rounded-xl py-2 pl-6 pr-4 font-bold text-xl text-text-main focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Strategy Selector */}
                {gap > 0 && (
                    <div className="grid grid-cols-3 gap-2 bg-bg-input p-1 rounded-xl">
                        <button 
                            onClick={() => setActiveStrategy('efficiency')}
                            className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${activeStrategy === 'efficiency' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
                        >
                            <Zap size={14} /> Max Efficiency
                        </button>
                        <button 
                            onClick={() => setActiveStrategy('balanced')}
                            className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${activeStrategy === 'balanced' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
                        >
                            <Scale size={14} /> Balanced
                        </button>
                        <button 
                            onClick={() => setActiveStrategy('diversified')}
                            className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${activeStrategy === 'diversified' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
                        >
                            <Layers size={14} /> Diversified
                        </button>
                    </div>
                )}
            </div>

            {/* AI Plan Output */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredData.length === 0 ? (
                    <p className="text-center text-text-muted text-sm py-10">No data found for this period.</p>
                ) : gap > 0 ? (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-4">
                            <p className="text-sm text-text-main">
                                Strategy: <span className="font-bold uppercase text-primary">{activeStrategy}</span>
                                <br/>
                                Recommended budget increase: <span className="font-bold text-red-400">${Math.round(totalRequiredBudget).toLocaleString()}</span>
                            </p>
                        </div>

                        {strategyPlan.map((plan) => (
                            <div key={plan.platformName} className="flex justify-between items-center p-3 bg-bg-input rounded-lg border border-border-color">
                                <div>
                                    <p className="font-bold text-text-main">{plan.platformName}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-text-muted">ROAS: {plan.currentRoas.toFixed(2)}x</p>
                                        {activeStrategy === 'efficiency' && plan.platformName === strategyPlan[0].platformName && (
                                            <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-1.5 rounded font-bold">Best ROI</span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-emerald-500 flex items-center gap-1 justify-end">
                                        <TrendingUp size={14} /> Add ${Math.round(plan.suggestedSpendAdd).toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-text-muted">
                                        target revenue: +${Math.round(plan.projectedRevenueAdd).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {strategyPlan.length === 0 && (
                            <p className="text-center text-text-muted text-sm py-4">
                                No profitable platforms found in this period.
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-70">
                         <Target size={48} className="text-emerald-500 mb-2" />
                         <p className="font-bold text-text-main">Target Achieved!</p>
                    </div>
                )}
            </div>
        </Card>
    );
};