import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { UploadCloud, X, FileSpreadsheet, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

export const UploadModal = ({ isOpen, onClose, onUploadSuccess }: UploadModalProps) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const processFile = async (file: File) => {
    if (!user) return;
    setIsLoading(true);
    setStatus('idle');

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) throw new Error("File is empty");

      const formattedData = jsonData.map((row) => ({
        user_id: user.id,
        date: row['Date'] ? new Date(row['Date'] as string).toISOString() : new Date().toISOString(),
        customer_name: row['Customer Name'] || 'Unknown',
        revenue: Number(row['Revenue']) || 0,
        expenses: Number(row['Expenses']) || 0,
        net_profit: Number(row['Net Profit']) || 0,
        refund_amount: Number(row['Refund Amount']) || 0,
        users: Number(row['Users']) || 0,
        new_user: row['New User'] === true || row['New User'] === 'TRUE',
        platform: row['Platform'] || 'Direct',
        campaign_name: row['Campaign Name'] || 'None',
        category: row['Category'] || 'General',
        status: row['Status'] || 'Pending',
        region: row['Region'] || 'Global'
      }));

      const { error } = await supabase.from('user_analytics').insert(formattedData);
      if (error) throw error;

      setStatus('success');
      setMessage(`Successfully imported ${formattedData.length} rows!`);
      
      setTimeout(() => {
        onUploadSuccess();
        onClose();
        setStatus('idle');
      }, 1500);

    } catch (error: unknown) {
      setStatus('error');
      setMessage('Error uploading file. Please check format.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-border-color w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-border-color flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
            <FileSpreadsheet className="text-primary" /> Import Excel
          </h2>
          <button onClick={onClose}><X size={20} className="text-text-muted" /></button>
        </div>

        <div className="p-10 text-center">
            {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-primary" size={40} />
                    <p className="text-text-main">Processing...</p>
                </div>
            ) : status === 'success' ? (
                <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="text-green-500" size={40} />
                    <p className="text-green-500 font-bold">{message}</p>
                </div>
            ) : (
                <>
                    <input 
                        type="file" 
                        accept=".xlsx, .csv" 
                        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                        className="hidden" 
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4 p-8 border-2 border-dashed border-border-color rounded-2xl hover:border-primary hover:bg-primary/5 transition-all">
                        <UploadCloud size={48} className="text-primary" />
                        <div>
                            <p className="font-bold text-text-main">Click to Upload Excel</p>
                            <p className="text-sm text-text-muted">.xlsx or .csv files</p>
                        </div>
                    </label>
                    {status === 'error' && <p className="text-red-500 mt-4 font-medium flex items-center justify-center gap-2"><AlertCircle size={16}/> {message}</p>}
                </>
            )}
        </div>
      </div>
    </div>
  );
};