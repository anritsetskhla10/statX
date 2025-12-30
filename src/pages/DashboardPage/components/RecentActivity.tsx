import { Card } from '../../../components/ui/Card';
import type { AnalyticsData } from '../hooks/useDashboardData';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const RecentActivity = ({ transactions }: { transactions: AnalyticsData[] }) => {
  return (
    <Card className="h-full flex flex-col">
      <h3 className="font-bold text-text-main mb-4">Recent Transactions</h3>
      <div className="space-y-4 overflow-y-auto flex-1 pr-2 max-h-75">
        {transactions.map((tx, i) => (
          <div key={i} className="flex justify-between items-center p-3 hover:bg-input-bg/50 rounded-xl transition-colors">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${tx.expenses > 0 || tx.refund_amount > 0 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {tx.expenses > 0 || tx.refund_amount > 0 ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                </div>
                <div>
                    <p className="font-bold text-sm text-text-main">{tx.customer_name}</p>
                    <p className="text-xs text-text-muted">{tx.platform} • {new Date(tx.date).toLocaleDateString()}</p>
                </div>
             </div>
             <div className="text-right">
                <p className={`font-bold text-sm ${tx.expenses > 0 || tx.refund_amount > 0 ? 'text-text-main' : 'text-green-500'}`}>
                    {tx.expenses > 0 ? `-$${tx.expenses}` : tx.refund_amount > 0 ? `-$${tx.refund_amount}` : `+$${tx.revenue}`}
                </p>
                <p className="text-[10px] text-text-muted uppercase">{tx.status}</p>
             </div>
          </div>
        ))}
        {transactions.length === 0 && <p className="text-center text-text-muted py-10">No transactions yet</p>}
      </div>
    </Card>
  );
};