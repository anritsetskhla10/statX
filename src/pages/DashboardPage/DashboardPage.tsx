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

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-500">
           
           {/* Loading State */}
           {isLoading && (
             <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-primary" size={40} />
             </div>
           )}

           {!isLoading && (
             <>
                {/* AI Insight Section */}
                <AIInsightCard 
                   stats={processedData?.stats} 
                   isLoading={isLoading} 
                />

                {/* Metrics Grid */}
                <StatsGrid data={processedData?.stats || []} />

                {/* Charts & Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <PerformanceChart data={processedData?.chartData || []} />
                    <RecentActivity transactions={processedData?.recentTransactions || []} /> 
                </div>
             </>
           )}

        </div>
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