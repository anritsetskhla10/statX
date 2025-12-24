
import { Link, useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, BarChart3, Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const navigate = useNavigate();

  const { user, session, signOut } = useAuthStore();
  const isAuthenticated = !!session;
  const profilePath = isAuthenticated ? '/profile' : '/auth';

  const handleLogout = async () => {
    await signOut();
    navigate({ to: '/auth' });
  };

  const userInitial = user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-bg/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-neon-blue to-purple-600 flex items-center justify-center shadow-lg shadow-neon-blue/20">
              <BarChart3 size={20} className="text-white" />
            </div>
            Stat<span className="text-neon-blue">X</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-2 [&.active]:text-neon-blue">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <Search size={16} className="absolute left-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search analytics..." 
              className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors w-48 lg:w-64 placeholder:text-gray-600"
            />
          </div>

          {/* Notification Bell */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative">
            <Bell size={20} />
            {isAuthenticated && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-blue rounded-full animate-pulse shadow-[0_0_8px_#00d4ff]"></span>
            )}
          </button>

          {/* User Profile Link */}
          <Link 
            to={profilePath} 
            className="hover:text-white transition-colors flex items-center gap-2 [&.active]:text-neon-blue group"
          >
             {isAuthenticated ? (
               <div className="w-8 h-8 rounded-full bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue font-bold text-xs group-hover:bg-neon-blue group-hover:text-dark-bg transition-all">
                 {userInitial.toUpperCase()}
               </div>
             ) : (
               <User size={18} />
             )}
          </Link>

          {/* Logout Button */}
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="hidden md:flex p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-full transition-all"
            >
              <LogOut size={18} />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>

        </div>
      </div>
    </nav>
  );
};