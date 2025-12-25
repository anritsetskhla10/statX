import { Link } from '@tanstack/react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge'; 

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-20 md:pt-0">

      <div className="absolute inset-0 bg-bg-main">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-200 h-125 bg-primary/20 blur-[120px] rounded-full opacity-50 mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-bg-main to-purple-600/10 opacity-40 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        
        {/* Badge Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge variant="primary" className="border border-primary/20 backdrop-blur-md px-4 py-1.5 shadow-[0_0_15px_rgba(var(--primary),0.15)]">
                <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AI-Powered Analytics Platform
            </Badge>
        </div>

        {/* Headline  */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-main tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Master Your <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 blur-2xl bg-linear-to-r from-primary via-cyan-400 to-purple-500 opacity-30"></span>
            <span className="relative bg-clip-text text-transparent bg-linear-to-r from-primary via-cyan-400 to-purple-500">
              Future Data Today.
            </span>
          </span>
        </h1>
        
        {/*  Description  */}
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          StatX transforms complex data streams into clear, real-time insights. Make smarter, data-driven decisions instantly with the power of Artificial Intelligence.
        </p>

        {/*  Buttons  */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 pt-8">
          <Link 
            to="/auth"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_35px_rgba(var(--primary),0.5)] hover:-translate-y-1 active:scale-95"
          >
            Get Started Free 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a 
            href="#features"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-text-main rounded-full font-semibold hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all active:scale-95"
          >
            <Sparkles size={18} className="text-purple-400 group-hover:scale-110 transition-transform" /> 
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;