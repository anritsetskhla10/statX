import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { transactions } from '../mockData';



export const RecentActivity = () => {
  return (
    <Card className="flex flex-col h-full min-h-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-main">Live Transactions</h3>
        <button className="text-xs text-primary font-semibold hover:underline">See All</button>
      </div>
      
      <div className="space-y-0 divide-y divide-border-color/50">
        {transactions.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 group hover:bg-input-bg/30 px-3 -mx-3 rounded-lg transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-input-bg to-card-bg border border-border-color flex items-center justify-center text-lg shadow-sm">
              {item.type === 'Purchase' ? '🛒' : item.type === 'Refund' ? '💸' : '💎'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-main truncate">{item.user}</p>
              <p className="text-xs text-text-muted">{item.time} • {item.type}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${item.amount > 0 ? 'text-text-main' : 'text-red-400'}`}>
                {item.amount > 0 ? '+' : ''}${item.amount}
              </p>
              <Badge 
                variant={item.status === 'completed' ? 'success' : item.status === 'pending' ? 'warning' : 'danger'} 
                className="scale-75 origin-right"
              >
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};