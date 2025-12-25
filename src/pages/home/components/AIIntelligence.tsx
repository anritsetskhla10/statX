import { BrainCircuit, ArrowRight } from 'lucide-react';

const AIIntelligence = () => {
  return (
    <section className="py-24 relative overflow-hidden container mx-auto px-4">
       <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm">
                <BrainCircuit size={20} /> AI-Powered Core
             </div>
             <h2 className="text-4xl md:text-6xl font-bold text-text-main leading-tight">
                Analytics That <br className="hidden lg:block"/> <span className="text-primary">Think With You.</span>
             </h2>
             <p className="text-text-muted text-lg max-w-xl mx-auto lg:mx-0">
                StatX doesn't just show you the past. Our advanced AI algorithms analyze data patterns to provide accurate predictions for future trends.
             </p>
             
             {/* Process Steps */}
             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 font-medium text-text-main">
                <Step number="1" text="Raw Data" />
                <ArrowRight className="text-text-muted/50 hidden sm:block" />
                <Step number="2" text="AI Processing" />
                <ArrowRight className="text-text-muted/50 hidden sm:block" />
                <Step number="3" text="Prediction" isActive />
             </div>
          </div>

          {/* Abstract Graphic */}
          <div className="flex-1 relative flex justify-center">
             <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse-slow"></div>
                <BrainCircuit className="w-full h-full text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.6)] animate-float" strokeWidth={1} />
                
                {/* Floating Tags */}
                <div className="absolute top-0 right-0 p-3 bg-card-bg/80 backdrop-blur border border-primary/30 rounded-xl text-xs font-bold text-primary animate-bounce-slow shadow-lg shadow-primary/10">
                   Trend +15% 📈
                </div>
                <div className="absolute bottom-10 left-0 p-3 bg-card-bg/80 backdrop-blur border border-purple-500/30 rounded-xl text-xs font-bold text-purple-400 animate-bounce-slow delay-300 shadow-lg shadow-purple-500/10">
                   Anomaly Detected ⚠️
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

const Step = ({ number, text, isActive }: { number: string, text: string, isActive?: boolean }) => (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 ${isActive ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'bg-card-bg border-white/5 hover:border-white/20'}`}>
       <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${isActive ? 'bg-primary text-white' : 'bg-white/10 text-text-muted'}`}>
          {number}
       </span>
       {text}
    </div>
)

export default AIIntelligence;