import { Card } from '../../../../components/ui/Card';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import type { AggregatedDataPoint } from '../../../../utils/analyticsHelpers';

export const TransactionTable = ({ data }: { data: AggregatedDataPoint[] }) => {
  
  const downloadExcel = () => {
    const exportData = data.map(item => {
        const margin = item.revenue > 0
            ? ((item.profit / item.revenue) * 100).toFixed(1) + '%'
            : '0%';

        return {
            "Date": item.name,   
            "Revenue": item.revenue,
            "Expenses": item.expenses,
            "Net Profit": item.profit,
            "Margin": margin    
        };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AnalyticsReport');
    XLSX.writeFile(wb, 'analytics_report.xlsx');
  };

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-border-color">
        <h3 className="font-bold text-text-main text-lg">Detailed Report</h3>
        <button
          onClick={downloadExcel}
          disabled={data.length === 0}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-input text-text-muted uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Revenue</th>
              <th className="px-6 py-4 font-semibold">Expenses</th>
              <th className="px-6 py-4 font-semibold">Profit</th>
              <th className="px-6 py-4 font-semibold text-right">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {data.length > 0 ? (
              data.map((item, index) => {
                const margin = item.revenue > 0
                    ? ((item.profit / item.revenue) * 100).toFixed(1)
                    : '0.0';
                
                return (
                  <tr key={index} className="hover:bg-bg-input/50 transition-colors group">
                    <td className="px-6 py-4 text-text-main font-medium group-hover:text-primary transition-colors whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-emerald-400">
                      +${item.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-red-400">
                      -${item.expenses.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 font-bold ${item.profit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      ${item.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-text-muted text-right">
                      {margin}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                  No data available for the selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};