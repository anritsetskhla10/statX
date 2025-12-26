import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { X, Upload, FileSpreadsheet, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';

interface ExcelRow {
  Date?: Date | string | number;
  // Financials
  Revenue?: number;
  Expenses?: number;
  'Net Profit'?: number;
  'Refund Amount'?: number;
  // Marketing
  Platform?: string;
  'Campaign Name'?: string;
  Impressions?: number;
  Clicks?: number;
  'Ad Spend'?: number;
  // User & Product
  Users?: number;
  'New User'?: boolean | string; 
  Category?: string;
  'Product Plan'?: string;
  Status?: string;
  Region?: string;
  
  [key: string]: unknown;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void; 
}

export const UploadModal = ({ isOpen, onClose, onUploadSuccess }: UploadModalProps) => {
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('idle');
    setMessage('');

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { cellDates: true });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) throw new Error("EMPTY_FILE");

      const formattedData = jsonData.map((row) => {
        let dateVal = row['Date'];
        if (dateVal instanceof Date) {
            dateVal = dateVal.toISOString();
        } else if (!dateVal) {
            dateVal = new Date().toISOString();
        }
        const revenue = Number(row['Revenue']) || 0;
        const expenses = Number(row['Expenses']) || 0;
        const netProfit = Number(row['Net Profit']) || (revenue - expenses); 

        const rawNewUser = row['New User'];
        const isNewUser = rawNewUser === true || rawNewUser === 'TRUE' || Number(rawNewUser) === 1;

        return {
            user_id: user?.id, 
            date: dateVal, 
            
            // Financials
            revenue: revenue,
            expenses: expenses,
            net_profit: netProfit,
            refund_amount: Number(row['Refund Amount']) || 0,

            // Marketing
            platform: row['Platform'] || 'Direct',
            campaign_name: row['Campaign Name'] || 'Organic',
            impressions: Number(row['Impressions']) || 0,
            clicks: Number(row['Clicks']) || 0,
            ad_spend: Number(row['Ad Spend']) || 0,

            // User & Product
            users: Number(row['Users']) || 1, 
            is_new_user: isNewUser,
            category: row['Category'] || 'General',
            product_plan: row['Product Plan'] || 'Standard',
            status: row['Status'] || 'completed',
            region: row['Region'] || 'Global'
        };
      });

      // Supabase insert
      const { error } = await supabase
        .from('user_analytics')
        .insert(formattedData);

      if (error) throw error;

      setStatus('success');
      setMessage(`${formattedData.length} Updated Successfully`);
      
      onUploadSuccess();

      setTimeout(() => {
        onClose();
        setStatus('idle');
        setMessage('');
      }, 1500);

    } catch (error: Error | unknown) {
      console.error(error);
      setStatus('error');
      if (error instanceof Error && error.message.includes('invalid input syntax for type date')) {
          setMessage('Date format is incorrect.');
      } else {
          setMessage(error instanceof Error ? error.message : 'Error during upload');
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      
      <div className="bg-card-bg border border-border-color w-full max-w-md rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          disabled={isUploading}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors p-1 hover:bg-input-bg rounded-lg"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center space-y-6">
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors
                ${status === 'success' ? 'bg-green-500/10 text-green-500' : 
                  status === 'error' ? 'bg-red-500/10 text-red-500' : 
                  'bg-primary/10 text-primary'}`}
            >
                {isUploading ? <Loader2 className="animate-spin" size={32} /> : 
                 status === 'success' ? <CheckCircle size={32} /> :
                 status === 'error' ? <AlertCircle size={32} /> :
                 <Upload size={32} />
                }
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-bold text-text-main">Import Full Data</h3>
                <p className="text-sm text-text-muted">
                   Supports: Financials, Marketing & User metrics.
                </p>
            </div>

            <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group
                ${status === 'error' ? 'border-red-500/50 bg-red-500/5' : 
                  status === 'success' ? 'border-green-500/50 bg-green-500/5' : 
                  'border-border-color hover:border-primary/50 hover:bg-input-bg/30'}`}
            >
                <FileSpreadsheet className="text-text-muted group-hover:text-primary transition-colors" size={40} />
                <span className="text-sm font-medium text-text-muted group-hover:text-text-main">
                    {isUploading ? 'Processing...' : 'Click to select Excel file'}
                </span>
            </div>

            <input 
                type="file" 
                accept=".xlsx, .xls" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileUpload} 
                disabled={isUploading}
            />

            {message && (
                <p className={`text-sm font-medium ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </div>
      </div>
    </div>
  );
};