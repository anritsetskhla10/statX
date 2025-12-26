interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabs = ['overview', 'analytics', 'customers', 'settings'];

  return (
    <div className="top-20 z-30 flex justify-center md:justify-start">
      <div className="inline-flex p-1 bg-card-bg/80 backdrop-blur-md border border-border-color rounded-full shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 capitalize ${
              activeTab === tab 
              ? 'bg-primary text-white shadow-md' 
              : 'text-text-muted hover:text-text-main'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};