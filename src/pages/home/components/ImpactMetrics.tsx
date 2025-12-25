const metrics = [
    { value: "30%", label: "Increased Efficiency", color: "text-primary", shadow: "shadow-primary/30" },
    { value: "2X", label: "Faster Decisions", color: "text-purple-400", shadow: "shadow-purple-400/30" },
    { value: "99.9%", label: "System Uptime", color: "text-green-400", shadow: "shadow-green-400/30" },
];

const ImpactMetrics = () => {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="bg-card-bg/40 backdrop-blur-md border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full"></div>

        <div className="relative z-10 text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-text-main">Real World Impact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
           {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center justify-center pt-8 md:pt-0 text-center group">
                 <h3 className={`text-6xl md:text-7xl font-bold mb-4 ${metric.color} drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-transform group-hover:scale-105 duration-300`}>
                    {metric.value}
                 </h3>
                 <p className="text-text-muted text-sm md:text-base font-semibold uppercase tracking-widest">{metric.label}</p>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;