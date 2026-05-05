import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { UploadCloud, X, FileSpreadsheet, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

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
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const processFile = async (file: File) => {
    if (!user) return;
    setIsLoading(true);
    setStatus('idle');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

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

      const { error: notifError } = await supabase.from('notifications').insert([
        {
          user_id: user.id,
          title: 'Data Import Successful',
          description: `Successfully processed and imported ${formattedData.length} rows from your Excel file.`,
          type: 'success',
          is_read: false
        }
      ]);

      if (notifError) {
        console.error('Failed to create notification:', notifError);
      }

      clearInterval(interval);
      setProgress(100);
      setStatus('success');
      setMessage(`Successfully imported ${formattedData.length} rows!`);

      setTimeout(() => {
        onUploadSuccess();
        onClose();
        setStatus('idle');
        setProgress(0);
        toast.success('Data successfully analyzed', {
          duration: 4000,
          style: {
            background: '#10B981',
            color: '#fff',
            borderRadius: '10px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        });
      }, 1200);

    } catch (error: unknown) {
      clearInterval(interval);
      setStatus('error');
      setMessage('Error uploading file. Please check format.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-border-color w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border-color flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
            <FileSpreadsheet className="text-primary" /> Import Excel
          </h2>
          <button onClick={onClose} disabled={isLoading} className="disabled:opacity-50 transition-opacity">
            <X size={20} className="text-text-muted hover:text-text-main" />
          </button>
        </div>

        <div className="p-10 text-center">
            {isLoading ? (
                <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
                    <Loader2 className="animate-spin text-primary" size={40} />
                    <div className="w-full">
                        <div className="flex justify-between text-sm font-medium text-text-main mb-2">
                            <span>Processing Data...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-input-bg rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out" 
                              style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : status === 'success' ? (
                <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle className="text-green-500" size={40} />
                    </div>
                    <p className="text-green-500 font-bold text-lg">Analysis Complete!</p>
                    <p className="text-sm text-text-muted">{message}</p>
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
                    <label 
                      htmlFor="file-upload" 
                      className="cursor-pointer flex flex-col items-center gap-4 p-8 border-2 border-dashed border-border-color rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                        <div className="p-4 bg-input-bg rounded-full group-hover:scale-110 transition-transform">
                          <UploadCloud size={40} className="text-primary" />
                        </div>
                        <div>
                            <p className="font-bold text-text-main text-lg">Click to Upload Excel</p>
                            <p className="text-sm text-text-muted mt-1">Supports .xlsx or .csv files</p>
                        </div>
                    </label>
                    {status === 'error' && (
                      <p className="text-red-500 mt-6 font-medium flex items-center justify-center gap-2 bg-red-500/10 py-2 px-4 rounded-lg">
                        <AlertCircle size={18}/> {message}
                      </p>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};