import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

export const DownloadTemplateButton = () => {

  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  const handleDownload = () => {
    const rows = [];
    const today = new Date();

    const customers = ["Alex M.", "Sarah K.", "TechFlow Inc.", "Design Studio", "John Doe", "Global Logistics", "Mike R.", "Emma W.", "Cloud Systems", "Unknown User"];
    const platforms = ["Instagram", "Facebook", "Google", "LinkedIn", "Direct", "Twitter"];
    const campaigns = ["Summer Promo", "Black Friday", "B2B Outreach", "Organic", "Retargeting", "Influencer Collab"];
    const categories = ["SaaS", "E-commerce", "Consulting", "Basic Plan", "Pro Plan", "Enterprise"];
    const regions = ["USA", "UK", "GEO", "GER", "CAN", "FRA"];

    // add 60 revenue entries
    for (let i = 0; i < 60; i++) {
      const daysAgo = random(0, 30); 
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);

      const revenue = random(50, 500) * 10; 
      const isNewUser = Math.random() > 0.5;

      rows.push({
        Date: date.toISOString().split('T')[0],
        'Customer Name': pick(customers),
        Revenue: revenue,
        Expenses: 0,
        'Net Profit': revenue, 
        'Refund Amount': 0,
        Users: random(1, 5),
        'New User': isNewUser,
        Platform: pick(platforms),
        'Campaign Name': pick(campaigns),
        Category: pick(categories),
        Status: 'Completed',
        Region: pick(regions)
      });
    }

    // Add 15 expenses (Ads, Server costs)
    for (let i = 0; i < 15; i++) {
      const daysAgo = random(0, 30);
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);
      const expense = random(100, 2000);

      rows.push({
        Date: date.toISOString().split('T')[0],
        'Customer Name': `${pick(['Facebook', 'Google', 'AWS', 'DigitalOcean'])} Ads/Server`,
        Revenue: 0,
        Expenses: expense,
        'Net Profit': -expense,
        'Refund Amount': 0,
        Users: 0,
        'New User': false,
        Platform: pick(['Facebook', 'Google', 'AWS']),
        'Campaign Name': 'Operational',
        Category: 'Ads',
        Status: 'Completed',
        Region: 'Global'
      });
    }

    // Add 5 refunds
    for (let i = 0; i < 5; i++) {
      const daysAgo = random(0, 15);
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);
      const refund = random(50, 300);

      rows.push({
        Date: date.toISOString().split('T')[0],
        'Customer Name': pick(customers),
        Revenue: 0,
        Expenses: 0,
        'Net Profit': 0,
        'Refund Amount': refund,
        Users: 1,
        'New User': false,
        Platform: 'Direct',
        'Campaign Name': 'Support',
        Category: 'Refund',
        Status: 'Refunded',
        Region: pick(regions)
      });
    }

    rows.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    // create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Big Data Demo");
    XLSX.writeFile(wb, "StatX_Full_Demo_Data.xlsx");
  };

  return (
    <button 
        onClick={handleDownload} 
        className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-primary/30 text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors"
    >
        <Download size={16} /> Download Full Data
    </button>
  );
};