import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Search, User, LogOut, Menu, X, Bell } from 'lucide-react'; 
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { NotificationDropdown } from './NotificationDropdown';
import { timeAgo } from '../utils/formatTime'; 

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, session, signOut } = useAuthStore();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const isAuthenticated = !!session;
  const profilePath = isAuthenticated ? '/profile' : '/auth';
  const userInitial = user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U';

  const { 
    notifications, 
    unreadCount, 
    fetchNotifications, 
    subscribeToRealtime, 
    unsubscribeFromRealtime 
  } = useNotificationStore();

  useEffect(() => {
    if (session) {
      fetchNotifications();
      subscribeToRealtime();
    }
    return () => {
      unsubscribeFromRealtime();
    };
  }, [session, fetchNotifications, subscribeToRealtime, unsubscribeFromRealtime]);

  const formattedNotifications = notifications.map(n => ({
    id: n.id,
    title: n.title,
    desc: n.description,
    time: timeAgo(n.created_at),
    read: n.is_read,
    type: n.type
  }));

  const handleLogout = async () => {
    await signOut();
    navigate({ to: '/auth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', },
    { to: '/features', label: 'Features' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-color bg-card-bg/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO & DESKTOP NAV */}
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold tracking-wider text-text-main">
            Stat<span className="text-primary">X</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-text-muted">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="hover:text-text-main transition-colors flex items-center gap-2 [&.active]:text-primary"
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link to="/dashboard" className="hover:text-text-main transition-colors flex items-center gap-2 [&.active]:text-primary">
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          
          {isAuthenticated && (
            <>
              <div className="hidden md:flex items-center relative">
                <Search size={16} className="absolute left-3 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search analytics..." 
                  className="bg-input-bg border border-border-color rounded-full py-1.5 pl-10 pr-4 text-sm text-text-main focus:outline-none focus:border-primary transition-colors w-40 lg:w-64 placeholder:text-text-muted"
                />
              </div>

              {/* Notification Component */}
              <NotificationDropdown 
                notifications={formattedNotifications}
                isOpen={isNotifOpen}
                onToggle={() => setIsNotifOpen(!isNotifOpen)}
                onClose={() => setIsNotifOpen(false)}
              />
            </>
          )}

          <Link to={profilePath} className="hover:text-text-main transition-colors flex items-center gap-2 [&.active]:text-primary group">
             {isAuthenticated ? (
               <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary group-hover:text-white transition-all">
                 {userInitial.toUpperCase()}
               </div>
             ) : (
               <User size={18} />
             )}
          </Link>

          {isAuthenticated && (
            <button onClick={handleLogout} className="hidden md:flex p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all">
              <LogOut size={18} />
            </button>
          )}

          {/* MOBILE MENU TOGGLE */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-text-muted hover:text-text-main">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-card-bg/95 backdrop-blur-xl border-b border-border-color animate-in slide-in-from-top-2 fade-in duration-200 shadow-2xl z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col p-4 gap-2 text-text-muted font-medium">
            
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 hover:text-primary hover:bg-white/5 rounded-lg transition-colors [&.active]:text-primary [&.active]:bg-primary/5">
                  {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 hover:text-primary hover:bg-white/5 rounded-lg transition-colors [&.active]:text-primary [&.active]:bg-primary/5">
                    Dashboard
                </Link>
                {/* Mobile Notification Link */}
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 hover:text-primary hover:bg-white/5 rounded-lg transition-colors">
                    <Bell size={20} /> Notifications ({unreadCount})
                </Link>
              </>
            )}

            <div className="h-px bg-border-color my-2 opacity-50"></div>

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