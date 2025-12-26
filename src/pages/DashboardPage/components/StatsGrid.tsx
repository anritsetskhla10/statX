import { TrendingUp, Users, CreditCard, Activity, Wallet, RefreshCcw, DollarSign } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export interface StatItem {
  label: string;
  value: number;
  trend: number;
  type: string;
  progress: number;
  inverse?: boolean;
}

interface StatsGridProps {
  data: StatItem[];
}

export const StatsGrid = ({ data }: StatsGridProps) => {
  
  const getIcon = (label: string) => {
    switch(label) {
      case 'Total Revenue': return CreditCard;
      case 'Total Expenses': return Wallet;
      case 'Net Profit': return DollarSign;
      case 'Refunds': return RefreshCcw;
      case 'Active Users': return Users;
      case 'Bounce Rate': return Activity;
      default: return TrendingUp;
    }
  };

  const getColor = (index: number) => {
    const colors = ['text-primary', 'text-orange-500', 'text-green-500', 'text-red-500', 'text-purple-400'];
    return colors[index % colors.length];
  };

  const formatValue = (val: number, type: string) => {
    if (type === 'currency') return `$${val.toLocaleString()}`;
    if (type === 'percent') return `${val}%`;
    return val.toLocaleString();
  };

  if (!data || data.length === 0) {
    return <div className="text-text-muted">Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((stat, i) => {
        const Icon = getIcon(stat.label);
        const isPositive = stat.inverse ? stat.trend < 0 : stat.trend > 0;
        
        return (
          <Card key={i} className="flex flex-col gap-4 p-5 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg bg-input-bg/50 ${getColor(i)} group-hover:bg-primary/10 transition-colors`}>
                <Icon size={20} />
              </div>
              <Badge 
                variant={isPositive ? 'success' : 'danger'} 
                className="bg-transparent border border-current"
              >
                {stat.trend > 0 ? '+' : ''}{stat.trend}%
              </Badge>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-main">
                {formatValue(stat.value, stat.type)}
              </h3>
              <p className="text-sm text-text-muted font-medium">{stat.label}</p>
            </div>
            <div className="w-full h-1 bg-border-color/30 rounded-full overflow-hidden mt-1">
               <div 
                 className={`h-full ${getColor(i).replace('text-', 'bg-')} rounded-full transition-all duration-1000`} 
                 style={{ width: `${stat.progress}%` }}
               ></div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};