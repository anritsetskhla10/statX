export const CareersHero = () => {
  return (
    <section className="pt-20 pb-16 text-center relative overflow-hidden">
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-150 h-100 bg-green-500/10 blur-[100px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Join the <span className="text-primary">StatX</span> Mission
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
          We’re looking for passionate problem solvers to help us build the future of data analytics. Work remotely, grow fast, and make an impact.
        </p>
      </div>
    </section>
  );
};