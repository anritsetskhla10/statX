import { useState, useMemo } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Calculator, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import type { AnalyticsData } from '../../hooks/useDashboardData';
import { getPlatformROASList } from '../../../../utils/aiHelpers';
import { CustomSelect } from '../../../../components/ui/CustomSelect';

interface WhatIfProps {
    rawData: AnalyticsData[];
}

export const WhatIfSimulator = ({ rawData }: WhatIfProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedPlatformName, setSelectedPlatformName] = useState<string>('');
    

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


    const platforms = useMemo(() => getPlatformROASList(filteredData), [filteredData]);

    const actualPeriodRevenue = useMemo(() => {
        return filteredData.reduce((acc, curr) => acc + curr.revenue, 0);
    }, [filteredData]);

    const platformOptions = useMemo(() => {
        return platforms.map(p => ({
            label: `${p.name} (ROAS: ${p.roas.toFixed(2)}x)`,
            value: p.name
        }));
    }, [platforms]);

    const activePlatformName = selectedPlatformName && platforms.find(p => p.name === selectedPlatformName) 
        ? selectedPlatformName 
        : (platforms.length > 0 ? platforms[0].name : '');

    const selectedPlatform = platforms.find(p => p.name === activePlatformName) || { name: 'N/A', roas: 0 };

    const adSpendIncrease = Number(inputValue) || 0;
    const estimatedGrowth = adSpendIncrease * selectedPlatform.roas;
    const projectedRevenue = actualPeriodRevenue + estimatedGrowth;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '' || /^\d+$/.test(val)) {
            setInputValue(val);
        }
    };

    return (
        <Card className="p-6 flex flex-col h-full bg-bg-card border border-border-color">
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-text-main flex items-center gap-2 text-lg">
                    <Calculator className="text-pink-500" size={24} /> "What-If" Calculator
                </h3>
                
                {/* Period Revenue Badge */}
                <div className="flex flex-col items-end">
                    <span className="text-xs text-text-muted uppercase font-bold">Actual Revenue (Period)</span>
                    <span className="text-text-main font-bold text-sm">
                        ${actualPeriodRevenue.toLocaleString()}
                    </span>
                </div>
            </div>
            
            <div className="space-y-6 flex-1 flex flex-col justify-center">
                
                {/*Date Picker Section */}
                <div>
                    <label className="text-xs font-bold text-text-muted uppercase mb-2 flex items-center gap-1">
                        <Calendar size={14}/> 1. Select Period Analysis
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

                {/*Platform Selector */}
                <div className="relative z-20"> 
                    <div className="flex justify-between mb-2">
                        <label className="block text-xs font-bold text-text-muted uppercase">
                            2. Platform to Boost
                        </label>
                        {selectedPlatform.roas > 0 && (
                            <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 rounded font-bold">
                                Period ROAS: {selectedPlatform.roas.toFixed(2)}x
                            </span>
                        )}
                    </div>
                    
                    {platforms.length > 0 ? (
                        <CustomSelect
                            value={activePlatformName}
                            onChange={(val) => setSelectedPlatformName(val)}
                            options={platformOptions}
                            placeholder="Choose platform..."
                        />
                    ) : (
                        <div className="p-3 bg-bg-input rounded-lg text-text-muted text-sm text-center border border-dashed border-border-color">
                            No data found for this period
                        </div>
                    )}
                </div>

                {/*Input Field */}
                <div className="relative z-10">
                    <label className="block text-xs font-bold text-text-muted uppercase mb-2">
                        3. Add Budget
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <DollarSign className="text-text-muted h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="e.g. 500"
                            disabled={platforms.length === 0}
                            className="block w-full pl-10 pr-4 py-2.5 bg-bg-input border border-border-color rounded-lg 
                                     text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary 
                                     outline-none transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Result Box */}
                <div className="p-5 bg-linear-to-br from-bg-input to-bg-card rounded-2xl text-center border border-border-color shadow-sm animate-in fade-in relative overflow-hidden z-0">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 relative z-10">
                        Projected Revenue (For Selected Period)
                    </p>
                    <div className="flex flex-col items-center relative z-10">
                        <span className="text-3xl font-extrabold text-text-main tracking-tight">
                            ${projectedRevenue.toLocaleString()}
                        </span>
                        
                        <div className={`mt-2 flex items-center gap-1 text-sm font-medium transition-all duration-300 ${adSpendIncrease > 0 && platforms.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                            <TrendingUp size={14} className="text-emerald-500" />
                            <span className="text-emerald-500">
                                +${estimatedGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })} potential growth
                            </span>
                        </div>
                    </div>
                    
                    {adSpendIncrease > 0 && platforms.length > 0 && (
                        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 pointer-events-none" />
                    )}
                </div>
            </div>
        </Card>
    );
};