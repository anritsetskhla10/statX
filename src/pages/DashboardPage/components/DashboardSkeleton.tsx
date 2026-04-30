
export const StatsGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-card-bg rounded-xl p-6 border border-border-color animate-pulse shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 bg-text-muted/20 rounded w-1/2"></div>
          <div className="h-10 w-10 bg-text-muted/20 rounded-lg"></div>
        </div>
        <div className="h-8 bg-text-muted/20 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-text-muted/20 rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

export const PerformanceChartSkeleton = () => (
  <div className="bg-card-bg rounded-xl p-6 border border-border-color animate-pulse shadow-sm h-full min-h-100">
     <div className="flex justify-between items-center mb-6">
       <div className="h-6 bg-text-muted/20 rounded w-1/4"></div>
       <div className="h-8 bg-text-muted/20 rounded w-24"></div>
     </div>
     <div className="h-75 bg-text-muted/10 rounded w-full"></div>
  </div>
);

export const RecentActivitySkeleton = () => (
  <div className="bg-card-bg rounded-xl p-6 border border-border-color animate-pulse shadow-sm h-full min-h-100">
    <div className="h-6 bg-text-muted/20 rounded w-1/3 mb-6"></div>
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-10 w-10 bg-text-muted/20 rounded-full shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-text-muted/20 rounded w-3/4"></div>
            <div className="h-3 bg-text-muted/20 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton = () => {
  return (
    <div className="w-full animate-in fade-in duration-300">
      <StatsGridSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PerformanceChartSkeleton />
        </div>
        <div className="lg:col-span-1">
          <RecentActivitySkeleton />
        </div>
      </div>
    </div>
  );
};