import { Blocks, Box, CircleDollarSign, Layers, Hexagon } from 'lucide-react';

const logos = [
  { icon: Blocks, name: "TechCorp" },
  { icon: Layers, name: "DataFlow" },
  { icon: Box, name: "CyberSystems" },
  { icon: CircleDollarSign, name: "FinanceAI" },
  { icon: Hexagon, name: "InnovateX" },
];

const TrustBar = () => {
  return (
    <section className="py-10 bg-card-bg/30 border-y border-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="text-text-muted text-xs font-semibold mb-8 uppercase tracking-[0.2em]">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center gap-2 text-text-muted hover:text-primary hover:opacity-100 transition-all duration-300 group cursor-default grayscale hover:grayscale-0">
              <logo.icon size={24} className="group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;