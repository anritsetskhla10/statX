import { useState } from 'react';
import { Check, X } from 'lucide-react';

export const PricingPlans = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: isYearly ? 0 : 0,
      period: "forever",
      desc: "Perfect for testing the waters.",
      features: ["1 User", "Up to 100 Rows Upload", "Basic Charts", "7-day History"],
      notIncluded: ["AI Insights", "Export Reports", "Team Collaboration"],
      cta: "Start for Free",
      popular: false
    },
    {
      name: "Pro",
      price: isYearly ? 29 : 39,
      period: "per month",
      desc: "For growing businesses.",
      features: ["5 Users", "Unlimited Uploads", "AI Insights & Forecasts", "Advanced Analytics", "Priority Support"],
      notIncluded: ["Custom API", "Dedicated Manager"],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: isYearly ? 99 : 119,
      period: "per month",
      desc: "For large scale operations.",
      features: ["Unlimited Users", "All Pro Features", "Custom API Access", "Dedicated Account Manager", "SSO & Audit Logs"],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-8 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-medium ${!isYearly ? 'text-text-main' : 'text-text-muted'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-8 bg-input-bg border border-border-color rounded-full relative transition-colors duration-300 focus:outline-none"
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-primary rounded-full transition-transform duration-300 shadow-md ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-text-main' : 'text-text-muted'}`}>
            Yearly <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full ml-1">-20%</span>
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 hover:-translate-y-2
                ${plan.popular 
                  ? 'bg-card-bg border-primary shadow-2xl shadow-primary/10 scale-105 z-10' 
                  : 'bg-card-bg/50 border-border-color hover:border-primary/50'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-text-main mb-2">{plan.name}</h3>
                <p className="text-text-muted text-sm min-h-10">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-text-main">${plan.price}</span>
                  <span className="text-text-muted mb-1">/{plan.period}</span>
                </div>
                {isYearly && plan.price > 0 && (
                   <p className="text-xs text-primary mt-2">Billed ${plan.price * 12} yearly</p>
                )}
              </div>

              <button className={`w-full py-3 rounded-xl font-bold mb-8 transition-colors
                ${plan.popular 
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25' 
                  : 'bg-input-bg text-text-main hover:bg-input-bg/80'}`}
              >
                {plan.cta}
              </button>

              <div className="space-y-4 flex-1">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-text-main">
                    <Check size={18} className="text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-text-muted opacity-60">
                    <X size={18} className="shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};