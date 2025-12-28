export const FinalCTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="relative rounded-[2.5rem] bg-card-bg border border-border-color overflow-hidden p-10 md:p-20 text-center">
          
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight">
              Ready to take control of your numbers?
            </h2>
            <p className="text-xl text-text-muted">
              Join thousands of users who are making smarter, data-driven decisions with StatX.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:-translate-y-1">
                    Start Free Trial
                </button>
                <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-border-color text-text-main rounded-full font-bold text-lg hover:border-primary hover:text-primary transition-all">
                    Contact Sales
                </button>
            </div>

            <p className="text-sm text-text-muted pt-4">
                No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};