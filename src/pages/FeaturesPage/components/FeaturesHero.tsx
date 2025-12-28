import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturesHero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles size={14} />
          <span>Next-Gen Analytics</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-text-main tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          Turn Complex Data into <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-500">
            Actionable Growth
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          StatX brings all your business metrics, financial reports, and user analytics into one intuitive dashboard powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-700">
          <button className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
            Get Started Now <ArrowRight size={18} />
          </button>
          <button className="px-8 py-3 bg-card-bg border border-border-color text-text-main rounded-xl font-semibold hover:border-primary/50 transition-all flex items-center justify-center">
            View Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};