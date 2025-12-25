import { PageHeader } from '../../components/ui/PageHeader';
import { RevenueCard } from './components/dashboard/RevenueCard';
import { ActiveUsersCard } from './components/dashboard/ActiveUsersCard';
import { HealthCard } from './components/dashboard/HealthCard';
import { TransactionsTable } from './components/dashboard/TransactionsTable';

const DashboardPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto pb-20 p-(--space-layout) space-y-(--space-layout)">
      
      <PageHeader 
        title="Dashboard Overview"
        description="Welcome back! Here is your daily performance."
        action={
          <button className="bg-card-bg border border-border-color text-text-main px-4 py-2 rounded-lg text-sm hover:bg-input-bg transition shadow-sm">
            Last 30 Days
          </button>
        }
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-(--space-layout)">
        
        <RevenueCard />
        
        <ActiveUsersCard />
        
        <HealthCard />
        
        <TransactionsTable />
        
      </div>
    </div>
  );
};

export default DashboardPage;