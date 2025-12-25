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
    <nav className="sticky top-0 z-50 w-full border-b border-border-color bg-card-bg/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-wider text-text-main flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <BarChart3 size={20} className="text-white" />
            </div>
            Stat<span className="text-primary">X</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
            <Link to="/" className="hover:text-text-main transition-colors flex items-center gap-2 [&.active]:text-primary">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <Search size={16} className="absolute left-3 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search analytics..." 
              className="bg-input-bg border border-border-color rounded-full py-1.5 pl-10 pr-4 text-sm text-text-main focus:outline-none focus:border-primary transition-colors w-48 lg:w-64 placeholder:text-text-muted"
            />
          </div>

          <button className="p-2 text-text-muted hover:text-text-main hover:bg-input-bg rounded-full transition-all relative">
            <Bell size={20} />
            {isAuthenticated && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>
            )}
          </button>

          <Link 
            to={profilePath} 
            className="hover:text-text-main transition-colors flex items-center gap-2 [&.active]:text-primary group"
          >
             {isAuthenticated ? (
               <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary group-hover:text-white transition-all">
                 {userInitial.toUpperCase()}
               </div>
             ) : (
               <User size={18} />
             )}
          </Link>

          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="hidden md:flex p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
            >
              <LogOut size={18} />
            </button>
          )}

          <button className="md:hidden p-2 text-text-muted hover:text-text-main">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};