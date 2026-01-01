import { Card } from '../../../../components/ui/Card';

export interface SummaryCardsProps {
  revenue: number;
  expenses: number;
  profit: number;
}

export const SummaryCards = ({ revenue, expenses, profit }: SummaryCardsProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6 border-l-4 border-l-cyan-400">
        <p className="text-text-muted text-sm font-medium">Total Revenue</p>
        <h3 className="text-2xl font-bold text-text-main mt-1">
          ${revenue.toLocaleString()}
        </h3>
      </Card>

      <Card className="p-6 border-l-4 border-l-purple-500">
        <p className="text-text-muted text-sm font-medium">Total Expenses</p>
        <h3 className="text-2xl font-bold text-text-main mt-1">
          ${expenses.toLocaleString()}
        </h3>
      </Card>

      <Card
        className={`p-6 border-l-4 ${
          profit >= 0 ? 'border-l-emerald-500' : 'border-l-red-500'
        }`}
      >
        <p className="text-text-muted text-sm font-medium">Net Profit</p>
        <h3
          className={`text-2xl font-bold mt-1 ${
            profit >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          ${profit.toLocaleString()}
        </h3>
      </Card>
    </div>
  );
};