import { Target, Users, Zap } from 'lucide-react';

export const OurStory = () => {
  return (
    <section className="py-16 bg-card-bg border-y border-border-color">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 text-primary font-bold uppercase text-sm tracking-wider">
                <Target size={16} /> Our Mission
             </div>
             <h2 className="text-3xl font-bold text-text-main">Empowering businesses to make smarter decisions.</h2>
             <p className="text-text-muted leading-relaxed">
                Founded in 2024, StatX started as a small internal tool to visualize Excel sheets. We realized that thousands of small businesses struggle with complex BI tools. 
             </p>
             <p className="text-text-muted leading-relaxed">
                We believe that analytics should be accessible, intuitive, and beautiful. That's why we built a platform that speaks your language, not just SQL.
             </p>
          </div>
          
          {/* Stats / Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
                { icon: Users, label: "Users", value: "10K+" },
                { icon: Zap, label: "Reports Generated", value: "1M+" },
             ].map((stat, i) => (
                <div key={i} className="p-6 bg-bg-main rounded-2xl border border-border-color hover:border-primary/50 transition-colors">
                    <stat.icon className="text-primary mb-3" size={32} />
                    <h3 className="text-2xl font-bold text-text-main">{stat.value}</h3>
                    <p className="text-text-muted">{stat.label}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};