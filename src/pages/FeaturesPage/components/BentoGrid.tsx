import { BarChart3, ShieldCheck, Zap, Globe, Smartphone, Layers } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Monitor your revenue, expenses, and user growth as they happen with zero latency."
  },
  {
    icon: Zap,
    title: "AI Forecasting",
    desc: "Predict future trends based on historical data using our advanced AI algorithms."
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    desc: "Your data is encrypted end-to-end with RLS policies ensuring only you see your numbers."
  },
  {
    icon: Globe,
    title: "Global Mapping",
    desc: "Visualize where your customers are coming from with interactive regional maps."
  },
  {
    icon: Layers,
    title: "Multi-Source Import",
    desc: "Combine data from Excel, APIs, and manual entry into a single unified view."
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    desc: "Access your dashboard from any device with a fully responsive interface."
  }
];

export const BentoGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-bg-main">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-main mb-4">Everything you need to scale</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Powerful features built for modern businesses, designed to be simple yet comprehensive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 bg-card-bg border border-border-color rounded-3xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-3">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};