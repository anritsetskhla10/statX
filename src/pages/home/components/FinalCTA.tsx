import { Link } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-bg-main to-bg-main"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[url('/grid-pattern.svg')] opacity-10 [mask-image:linear-gradient(0deg,white,transparent)]"></div>

      <div className="relative z-10 container mx-auto max-w-4xl text-center space-y-10">
        <h2 className="text-5xl md:text-8xl font-bold text-text-main leading-tight tracking-tight">
          Ready to Shape <br />
          <span className="text-primary filter drop-shadow-[0_0_30px_rgba(var(--primary),0.4)]">
            The Future?
          </span>
        </h2>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          Join thousands of innovative companies already optimizing their workflow with StatX. Start your 14-day free trial today.
        </p>

        <div className="pt-8">
           <Link 
             to="/auth"
             className="inline-flex items-center gap-3 px-12 py-6 bg-primary text-white text-xl rounded-full font-bold hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:shadow-[0_0_50px_rgba(var(--primary),0.6)] hover:-translate-y-2 group"
           >
             <Sparkles className="group-hover:animate-spin-slow" /> Create Free Account
           </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;