import { MoreHorizontal } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';

const transactions = [
  { name: "Neon Tech Labs", status: "Success", date: "Today, 14:02", amount: "+$1,200.00", color: "#48dd84" },
  { name: "CyberSystems Inc", status: "Pending", date: "Yesterday", amount: "$850.00", color: "#48c4dd" },
  { name: "Future Vision AI", status: "Failed", date: "Oct 24, 2023", amount: "$0.00", color: "#dd48c4" },
  { name: "Global Grid Ltd", status: "Success", date: "Oct 23, 2023", amount: "+$2,400.00", color: "#48dd84" },
];

export const TransactionsTable = () => {
  return (
    <Card className="lg:col-span-3">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-text-main font-semibold">Recent Transactions</h3>
        <button className="p-2 hover:bg-input-bg rounded-lg text-text-muted transition">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-text-muted text-sm border-b border-border-color">
              <th className="pb-4 font-medium pl-2">Customer</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium text-right pr-2">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.map((item, index) => (
              <tr key={index} className="group hover:bg-input-bg transition-colors border-b border-border-color last:border-0">
                <td className="py-4 pl-2 font-medium text-text-main flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-input-bg flex items-center justify-center text-xs font-bold">
                    {item.name.charAt(0)}
                  </div>
                  {item.name}
                </td>
                <td className="py-4">
                  <span 
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-text-muted">{item.date}</td>
                <td className="py-4 text-right pr-2 font-mono text-text-main">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};