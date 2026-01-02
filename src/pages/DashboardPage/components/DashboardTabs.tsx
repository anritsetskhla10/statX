interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabs = ['overview', 'analytics', 'marketing', 'AI Insights'];

  return (
    <div className="top-70 z-30 w-full overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
      <div className="inline-flex p-1 bg-card-bg/90 backdrop-blur-md border border-border-color rounded-full shadow-lg min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 capitalize whitespace-nowrap ${
              activeTab === tab 
              ? 'bg-primary text-white shadow-md' 
              : 'text-text-muted hover:text-text-main hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};