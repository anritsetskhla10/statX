import { HelpCircle } from 'lucide-react';

export const PricingFAQ = () => {
  const faqs = [
    { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to the next billing cycle." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for all paid plans. No questions asked." },
    { q: "What happens if I hit the user limit?", a: "We'll notify you when you're close to the limit. You can choose to upgrade or remove inactive users." },
    { q: "Is my data secure?", a: "Absolutely. We use bank-grade encryption and strict RLS policies to ensure your data is private and secure." },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main mb-4">Frequently Asked Questions</h2>
            <p className="text-text-muted">Have a different question? Contact our support team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((item, i) => (
                <div key={i} className="p-6 bg-card-bg border border-border-color rounded-2xl hover:border-primary/50 transition-colors">
                    <div className="flex gap-3 mb-3">
                        <HelpCircle className="text-primary shrink-0" size={20} />
                        <h3 className="font-bold text-text-main">{item.q}</h3>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed pl-8">
                        {item.a}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};