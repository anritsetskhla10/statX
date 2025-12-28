import { FileSpreadsheet, ArrowRight, Database } from 'lucide-react';

export const IntegrationFlow = () => {
  return (
    <section className="py-16 bg-bg-main border-y border-border-color">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-main mb-4">Seamless Data Integration</h2>
          <p className="text-text-muted">Bring your own data. We handle the rest.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
            
            <div className="flex flex-col items-center text-center gap-4 group">
                <div className="w-24 h-24 bg-card-bg border-2 border-border-color rounded-3xl flex items-center justify-center text-green-600 shadow-sm group-hover:border-green-500 transition-colors">
                    <FileSpreadsheet size={40} />
                </div>
                <p className="font-bold text-text-main">Your Excel File</p>
            </div>

            <div className="hidden md:flex text-text-muted animate-pulse">
                <ArrowRight size={32} />
            </div>
             <div className="md:hidden text-text-muted rotate-90 my-2">
                <ArrowRight size={24} />
            </div>

            <div className="flex flex-col items-center text-center gap-4 group">
                <div className="w-24 h-24 bg-card-bg border-2 border-border-color rounded-3xl flex items-center justify-center text-primary shadow-sm group-hover:border-primary transition-colors relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Database size={40} className="relative z-10" />
                </div>
                <p className="font-bold text-text-main">Secure Processing</p>
            </div>

            <div className="hidden md:flex text-text-muted animate-pulse delay-150">
                <ArrowRight size={32} />
            </div>
             <div className="md:hidden text-text-muted rotate-90 my-2">
                <ArrowRight size={24} />
            </div>

            <div className="flex flex-col items-center text-center gap-4 group">
                <div className="w-24 h-24 bg-linear-to-br from-primary to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                    <span className="text-2xl font-bold">StatX</span>
                </div>
                <p className="font-bold text-text-main">Live Dashboard</p>
            </div>

        </div>
      </div>
    </section>
  );
};