import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Loader2 } from 'lucide-react';
import { useDashboardData } from './hooks/useDashboardData'; 
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardTabs } from './components/DashboardTabs';
import { StatsGrid } from './components/StatsGrid';
import { PerformanceChart } from './components/PerformanceChart';
import { RecentActivity } from './components/RecentActivity';
import { UploadModal } from './components/UploadModal'; 
import { AIInsightCard } from './components/AIInsightCard'; 
import { AnalyticsTab } from './components/AnalyticsTab';
import { MarketingTab } from './components/MarketingTab';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const userName = user?.user_metadata?.full_name || 'User';
  const [activeTab, setActiveTab] = useState('overview');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { processedData, isLoading, refetch } = useDashboardData();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header */}
      <DashboardHeader 
          userName={userName} 
          setIsUploadModalOpen={setIsUploadModalOpen} 
      />

      {/* Navigation */}
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {isLoading && (
         <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
         </div>
      )}

      {!isLoading && (
        <>
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <AIInsightCard 
                  stats={processedData?.stats} 
                  isLoading={isLoading} 
               />
               <StatsGrid data={processedData?.stats || []} />
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <PerformanceChart data={processedData?.chartData || []} />
                   <RecentActivity transactions={processedData?.recentTransactions || []} /> 
               </div>
            </div>
          )}

          {activeTab === 'analytics' && processedData && (
             <AnalyticsTab data={processedData} />
          )}
          
          {activeTab === 'analytics' && !processedData && (
             <div className="text-center py-20 text-text-muted">
                No analytics data available. Please upload data first.
             </div>
          )}
          {activeTab === 'marketing' && processedData && (
              <MarketingTab data={processedData} />
          )}
          {activeTab === 'marketing' && !processedData && (
             <div className="text-center py-20 text-text-muted">
                No marketing data available. Please upload data first.
             </div>
          )}
        </>
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={refetch} 
      />

    </div>
  );
};

export default DashboardPage;