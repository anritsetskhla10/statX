import { useMemo } from 'react';
import type { AnalyticsData } from '../hooks/useDashboardData';
import { generateForecast, detectAnomalies, getRadarData } from '../../../utils/aiHelpers';
import { Card } from '../../../components/ui/Card';
import { RevenueForecast } from './AIInsights/RevenueForecast';
import { AnomalyDetector } from './AIInsights/AnomalyDetector';
import { WhatIfSimulator } from './AIInsights/WhatIfSimulator';
import { OpportunityRadar } from './AIInsights/OpportunityRadar';
import { TargetAchiever } from './AIInsights/TargetAchiever';

export const AIInsightsTab = ({ data }: { data: { rawData: AnalyticsData[] } | null }) => {
    const rawData = useMemo(() => data?.rawData || [], [data]);
    const forecastData = useMemo(() => generateForecast(rawData), [rawData]);
    const anomalies = useMemo(() => detectAnomalies(rawData), [rawData]);
    const radarData = useMemo(() => getRadarData(rawData), [rawData]);
    

    if (!data) return null;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Row: Budget & Simulator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TargetAchiever rawData={rawData} />
                <WhatIfSimulator rawData={rawData} />
            </div>

            {/* Middle Row: Forecast & Anomalies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueForecast data={forecastData} />
                </div>
                <div>
                    <AnomalyDetector anomalies={anomalies} />
                </div>
            </div>

            {/* Bottom Row: Radar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OpportunityRadar data={radarData} />
                
                {/* Placeholder for future model */}
                <Card className="p-6 flex flex-col items-center justify-center border-dashed border-2 border-border-color bg-transparent min-h-100">
                     <div className="p-4 bg-bg-input rounded-full mb-4 animate-pulse">
                        <div className="w-8 h-8 bg-text-muted/20 rounded-full" />
                     </div>
                     <p className="text-text-muted font-medium">Training Churn Prediction Model...</p>
                     <p className="text-xs text-text-muted mt-2">Available in next update</p>
                </Card>
            </div>
        </div>
    );
};