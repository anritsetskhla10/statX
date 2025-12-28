import { BrainCircuit, CheckCircle2 } from 'lucide-react';

export const AISpotlight = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative bg-linear-to-br from-card-bg to-bg-main border border-border-color rounded-[3rem] p-8 md:p-16 overflow-hidden">
          
          {/* Decorative Background Blob */}
          <div className="absolute top-0 right-0 w-125 h-125 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-primary font-bold">
                <BrainCircuit className="animate-pulse" />
                <span>StatX AI Engine</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-text-main leading-tight">
                Let AI be your <br /> <span className="text-primary">Financial Analyst.</span>
              </h2>
              <p className="text-lg text-text-muted">
                Don't just look at charts. Understand them. Our AI analyzes your Excel uploads to provide actionable insights, warnings, and growth opportunities instantly.
              </p>
              
              <ul className="space-y-4">
                {['Automated Profit Analysis', 'Expense Anomaly Detection', 'Revenue Forecasting'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-main font-medium">
                    <CheckCircle2 className="text-green-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Abstract UI Representation */}
            <div className="relative">
              <div className="bg-card-bg/80 backdrop-blur-md border border-border-color p-6 rounded-2xl shadow-2xl transform lg:rotate-3 transition-transform hover:rotate-0 duration-500">
                 <div className="flex items-center gap-4 mb-6 border-b border-border-color pb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <BrainCircuit size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-text-main">AI Insight</h4>
                        <p className="text-xs text-text-muted">Just now</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="h-4 bg-bg-input rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-bg-input rounded w-1/2 animate-pulse"></div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl mt-4">
                        <p className="text-sm text-green-600 font-semibold">
                            🚀 Revenue is trending up by 20%. Forecast suggests hitting monthly goal by Friday.
                        </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};