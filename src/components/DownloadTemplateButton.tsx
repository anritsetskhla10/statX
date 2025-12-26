import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

export const DownloadTemplateButton = () => {
  
  const handleDownloadTemplate = () => {
    const templateData = [
      {
        Date: new Date().toISOString().split('T')[0], 
        Revenue: 1500,
        Expenses: 400,
        'Net Profit': 1100, 
        'Refund Amount': 0,
        // Marketing
        Platform: 'Instagram',
        'Campaign Name': 'Summer Promo',
        Impressions: 5000,
        Clicks: 150,
        'Ad Spend': 50,
        Users: 45,
        'New User': true,
        Category: 'SaaS',
        'Product Plan': 'Pro',
        Status: 'Completed',
        Region: 'USA'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const wscols = [
        { wch: 12 }, // Date
        { wch: 10 }, // Revenue
        { wch: 10 }, // Expenses
        { wch: 10 }, // Net Profit
        { wch: 15 }, // Refund Amount
        { wch: 12 }, // Platform
        { wch: 20 }, // Campaign
        { wch: 12 }, // Impressions
        { wch: 8 },  // Clicks
        { wch: 10 }, // Ad Spend
        { wch: 8 },  // Users
        { wch: 10 }, // New User
        { wch: 10 }, // Category
        { wch: 12 }, // Plan
        { wch: 12 }, // Status
        { wch: 10 }, // Region
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StatX Template");
    XLSX.writeFile(workbook, "StatX_Data_Template.xlsx");
  };

  return (
    <button 
        onClick={handleDownloadTemplate}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 duration-200"
    >
        <Download size={16} /> Export Template
    </button>
  );
};