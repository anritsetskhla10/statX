import { Card } from '../../../../components/ui/Card';
import { Zap, ArrowRight, TrendingUp } from 'lucide-react';

interface BudgetRecommendation {
    takeFrom: { name: string; roas: number };
    giveTo: { name: string; roas: number };
    potentialGain: number;
}

export const BudgetOptimizer = ({ recommendation }: { recommendation: BudgetRecommendation | null }) => {
    if (!recommendation) return null; 

    return (
        <Card className="p-6 bg-linear-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

            <h3 className="font-bold text-text-main flex items-center gap-2 mb-6 text-lg relative z-10">
                <Zap className="text-yellow-400 fill-yellow-400" size={24} /> Smart Budget Allocator
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                {/* Decrease Side */}
                <div className="bg-bg-card p-5 rounded-2xl border border-red-500/20 w-full text-center shadow-sm">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Decrease Budget</p>
                    <p className="font-extrabold text-text-main text-xl mb-1">{recommendation.takeFrom.name}</p>
                    <div className="inline-flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded text-xs text-red-500">
                        <span>ROAS: {recommendation.takeFrom.roas.toFixed(2)}x</span>
                    </div>
                </div>

                <div className="text-text-muted bg-bg-input p-2 rounded-full">
                    <ArrowRight className="rotate-90 md:rotate-0" size={20} />
                </div>

                {/* Increase Side */}
                <div className="bg-bg-card p-5 rounded-2xl border border-emerald-500/20 w-full text-center shadow-sm">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Increase Budget</p>
                    <p className="font-extrabold text-text-main text-xl mb-1">{recommendation.giveTo.name}</p>
                    <div className="inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded text-xs text-emerald-500">
                        <span>ROAS: {recommendation.giveTo.roas.toFixed(2)}x</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-bg-card border border-border-color px-4 py-2 rounded-xl shadow-sm">
                    <TrendingUp size={16} className="text-emerald-500" />
                    <p className="text-sm text-text-main">
                        Projected Impact: <span className="text-emerald-500 font-bold">+{recommendation.potentialGain}% Efficiency</span>
                    </p>
                </div>
            </div>
        </Card>
    );
};