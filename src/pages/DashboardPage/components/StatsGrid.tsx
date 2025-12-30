import { Card } from '../../../components/ui/Card';
import { TrendingUp, Users, CreditCard, DollarSign } from 'lucide-react';


export interface Stat {
  label: string;
  value: number;
  trend: number;
  type: 'currency' | 'number'; 
  progress: number;
  inverse?: boolean;
}

interface StatsGridProps {
  data: Stat[];
}

export const StatsGrid = ({ data }: StatsGridProps) => {
  if (!data) return null;
  
  const icons = [CreditCard, DollarSign, TrendingUp, Users];
  const colors = ['text-blue-500', 'text-orange-500', 'text-green-500', 'text-purple-500'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((stat, i) => {
        const Icon = icons[i] || TrendingUp; 
        
        return (
          <Card key={i} className="p-6 flex flex-col gap-2">
            <div className="flex justify-between items-start">
               <div className={`p-2 bg-input-bg rounded-lg ${colors[i] || 'text-primary'}`}>
                 <Icon size={20}/>
               </div>
               <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                 {stat.trend > 0 ? '+' : ''}{stat.trend}%
               </span>
            </div>
            <div>
               <h3 className="text-2xl font-bold text-text-main">
                  {stat.type === 'currency' ? `$${stat.value.toLocaleString()}` : stat.value}
               </h3>
               <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};