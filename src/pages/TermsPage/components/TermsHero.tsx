export const TermsHero = () => {
  return (
    <section className="pt-20 pb-12 text-center bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-150 h-75 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-text-main mb-4">Terms of Service</h1>
        <p className="text-text-muted">Please read these terms carefully before using StatX.</p>
      </div>
    </section>
  );
};