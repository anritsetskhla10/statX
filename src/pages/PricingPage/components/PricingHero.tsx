export const PricingHero = () => {
  return (
    <section className="pt-20 pb-12 text-center relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Simple, transparent <br />
          <span className="text-primary">pricing for everyone.</span>
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
          Choose the plan that fits your business needs. No hidden fees, no credit card required to start.
        </p>
      </div>
    </section>
  );
};