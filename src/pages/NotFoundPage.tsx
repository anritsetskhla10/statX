import { Link } from '@tanstack/react-router';
import { FileQuestion, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-500">
      
      {/* Icon with Glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-neon-blue blur-2xl opacity-20 rounded-full"></div>
        <FileQuestion size={80} className="text-neon-blue relative z-10" />
      </div>

      <h1 className="text-6xl font-bold text-white mb-2 tracking-tighter">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
      
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link 
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-neon-blue/50 text-neon-blue rounded-full hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 font-medium shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)]"
      >
        <Home size={18} />
        Go Back Home
      </Link>

    </div>
  );
};

export default NotFoundPage;