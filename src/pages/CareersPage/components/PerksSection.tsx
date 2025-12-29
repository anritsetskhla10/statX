import { Globe, Laptop, Heart, Zap } from 'lucide-react';

export const PerksSection = () => {
  const perks = [
    { icon: Globe, title: "Remote First", desc: "Work from anywhere in the world. We trust you to manage your time." },
    { icon: Laptop, title: "Top Equipment", desc: "We provide the latest Apple gear and a budget for your home office." },
    { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health insurance and a monthly wellness stipend." },
    { icon: Zap, title: "Fast Growth", desc: "Competitive salary, equity options, and a clear career growth path." },
  ];

  return (
    <section className="py-16 bg-card-bg border-y border-border-color">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
                <perk.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-main">{perk.title}</h3>
              <p className="text-sm text-text-muted">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};