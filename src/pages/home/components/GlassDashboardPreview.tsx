import DashboardImg from '../../../assets/dashboard.png';

const GlassDashboardPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-150 bg-primary/10 blur-[100px] rounded-full -z-10"></div>

      <div className="container mx-auto max-w-6xl text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-text-main">
            An Experience Beyond <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan-300">Boundaries.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-3xl mx-auto">
            Discover an interface designed for clarity, speed, and aesthetic perfection.
          </p>
        </div>

        {/* 3D Glass Container */}
        <div className="relative group perspective-1000 px-2 md:px-0">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 md:p-3 shadow-2xl shadow-black/50 transform transition-transform duration-700 hover:scale-[1.01]">
            
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-700"></div>
            
            {/* Dashboard Image */}
            <img 
              src={DashboardImg}
              alt="StatX Dashboard Preview" 
              className="rounded-2xl w-full h-auto border border-white/5 shadow-inner"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


export default GlassDashboardPreview;