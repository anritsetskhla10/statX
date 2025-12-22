import { Link } from '@tanstack/react-router';
import { LayoutDashboard, BarChart3, Settings, Bell, Search, User, Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-neon-blue to-purple-600 flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            Stat<span className="text-neon-blue">X</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-2 [&.active]:text-neon-blue">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/settings" className="hover:text-white transition-colors flex items-center gap-2">
              <Settings size={18} /> Settings
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="hidden md:flex items-center relative">
            <Search size={16} className="absolute left-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search analytics..." 
              className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors w-64 placeholder:text-gray-600"
            />
          </div>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-blue rounded-full animate-pulse"></span>
          </button>

          <Link to="/auth" className="hover:text-white transition-colors flex items-center gap-2 [&.active]:text-neon-blue">
              <User size={18} /> Profile
          </Link>

          <button className="md:hidden p-2 text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};