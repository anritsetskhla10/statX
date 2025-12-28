export const PrivacyHero = () => {
  return (
    <section className="pt-20 pb-12 text-center bg-bg-main relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-text-main mb-4">Privacy Policy</h1>
        <p className="text-text-muted">Last updated: December 29, 2025</p>
      </div>
    </section>
  );
};