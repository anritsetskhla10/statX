import { UploadCloud } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { DownloadTemplateButton } from '../../../components/DownloadTemplateButton';

interface HeaderProps {
  userName: string;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardHeader = ({ userName, setIsUploadModalOpen,  }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-border-color pb-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="primary">AI Analysis Ready</Badge>
          <span className="text-xs text-text-muted">Last updated: Just now</span>
        </div>
        <h1 className="text-4xl font-bold text-text-main tracking-tight">
          Welcome, <span className="text-primary">{userName}</span>
        </h1>
      </div>
      
      <div className="flex gap-3">
            <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-card-bg border border-primary/30 text-primary rounded-full text-sm font-medium hover:bg-primary/10 transition-colors shadow-sm"
            >
                <UploadCloud size={16} /> Import Data
            </button>

            <DownloadTemplateButton />
        </div>
    </div>
  );
};