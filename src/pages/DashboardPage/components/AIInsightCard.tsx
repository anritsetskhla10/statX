import { BrainCircuit, ArrowRight, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  trend: number;
  progress: number;
}

interface AIInsightCardProps {
  stats: StatItem[] | undefined;
  isLoading: boolean;
}

export const AIInsightCard = ({ stats, isLoading }: AIInsightCardProps) => {
  
  const generateInsight = () => {
    if (isLoading) return "Analyzing your data...";
    if (!stats || stats.length === 0) return "Upload data to generate AI insights.";

    const revenue = stats.find(s => s.label === "Total Revenue");
    const expenses = stats.find(s => s.label === "Total Expenses");
    const profit = stats.find(s => s.label === "Net Profit");

    if (revenue && expenses && expenses.value > revenue.value) {
        return {
            text: `Critical Alert: Expenses ($${expenses.value.toLocaleString()}) have exceeded Revenue. Immediate audit required to improve Net Profit.`,
            variant: 'danger',
            icon: AlertTriangle
        };
    }

    if (profit && profit.trend > 0) {
        return {
            text: `Great Performance! Net Profit is trending up by ${profit.trend}%. Forecast suggests hitting the quarterly goal early.`,
            variant: 'success',
            icon: TrendingUp
        };
    }

    if (revenue && revenue.trend > 0) {
        return {
            text: `Revenue is trending up by ${revenue.trend}%. Consider increasing ad spend to maximize growth momentum.`,
            variant: 'neutral',
            icon: CheckCircle
        };
    }

    return {
        text: "Data uploaded. System is monitoring your key metrics for actionable insights.",
        variant: 'neutral',
        icon: BrainCircuit
    };
  };

  const insight = generateInsight();
  const content = typeof insight === 'string' ? { text: insight, variant: 'neutral', icon: BrainCircuit } : insight;

  const getGradient = () => {
      if (content.variant === 'danger') return 'from-red-500/10 via-orange-500/10 to-transparent border-red-500/20';
      if (content.variant === 'success') return 'from-green-500/10 via-emerald-500/10 to-transparent border-green-500/20';
      return 'from-primary/10 via-purple-500/10 to-transparent border-primary/20';
  };

  const Icon = content.icon;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-linear-to-r ${getGradient()} border p-6 md:p-8 hover:border-opacity-50 transition-colors cursor-pointer group`}>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
                <div className={`flex items-center gap-2 font-bold ${content.variant === 'danger' ? 'text-red-500' : content.variant === 'success' ? 'text-green-500' : 'text-primary'}`}>
                    <Icon size={24} className={isLoading ? "animate-spin" : "animate-pulse"} /> 
                    <span>StatX AI Insight</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-text-main max-w-3xl leading-snug">
                    {content.text}
                </h3>
            </div>
            
            {!isLoading && stats && stats.length > 0 && (
                <button className="flex items-center gap-2 px-6 py-3 bg-card-bg/50 backdrop-blur border border-border-color rounded-xl font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg whitespace-nowrap">
                    View Full Report <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
            )}
        </div>
        
        {/* Background Decoration */}
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none opacity-50
            ${content.variant === 'danger' ? 'bg-red-500/20' : content.variant === 'success' ? 'bg-green-500/20' : 'bg-primary/20'}`} 
        ></div>
    </div>
  );
};