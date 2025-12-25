import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, BarChart3, Bell, Search, User, LogOut, Menu, X, Home, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, session, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAuthenticated = !!session;
  const profilePath = isAuthenticated ? '/profile' : '/auth';

  const handleLogout = async () => {
    await signOut();
    navigate({ to: '/auth' });
    setIsMenuOpen(false);
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
               <Home size={18} /> Home
            </Link>
            <a href="/#features" className="hover:text-text-main transition-colors flex items-center gap-2">
               <Sparkles size={18} /> Features
            </a>

            {isAuthenticated && (
              <Link to="/dashboard" className="hover:text-text-main transition-colors flex items-center gap-2 [&.active]:text-primary">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          
          {isAuthenticated && (
            <>
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
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>
              </button>
            </>
          )}

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

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-text-muted hover:text-text-main"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-card-bg/95 backdrop-blur-xl border-b border-border-color animate-in slide-in-from-top-2 fade-in duration-200 shadow-2xl z-40">
          <div className="flex flex-col p-4 gap-3 text-text-muted font-medium">
            
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
               <Home size={20} /> Home
            </Link>
            <a href="/#features" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
               <Sparkles size={20} /> Features
            </a>

            {isAuthenticated && (
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
                <LayoutDashboard size={20} /> Dashboard
              </Link>
            )}

            <div className="h-px bg-border-color my-1 opacity-50"></div>

            <Link to={profilePath} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
              <User size={20} /> {isAuthenticated ? 'Profile Settings' : 'Sign In'}
            </Link>

            {isAuthenticated && (
              <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left">
                <LogOut size={20} /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};