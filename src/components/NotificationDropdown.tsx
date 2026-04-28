import { useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const NotificationDropdown = ({ 
  notifications, 
  isOpen, 
  onClose, 
  onToggle 
}: NotificationDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={onToggle}
        aria-label="Toggle notifications"
        className={`p-2 rounded-full transition-all relative ${
            isOpen ? 'bg-input-bg text-text-main' : 'text-text-muted hover:text-text-main hover:bg-input-bg'
        }`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 rounded-xl border border-border-color bg-card-bg shadow-xl animate-in fade-in slide-in-from-top-2 overflow-hidden z-50">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-color px-4 py-3">
            <h4 className="font-semibold text-text-main">Notifications</h4>
            <span className="text-xs text-text-muted">{unreadCount} unread</span>
          </div>
          
          <div className="max-h-75 overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.slice(0, 3).map((note) => (
                <div 
                    key={note.id} 
                    className={`flex gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-border-color/50 last:border-0 ${!note.read ? 'bg-primary/5' : ''}`}
                >
                  <div className="mt-1 shrink-0">
                      {note.type === 'success' && <CheckCircle size={16} className="text-green-500" />}
                      {note.type === 'warning' && <AlertTriangle size={16} className="text-yellow-500" />}
                      {(note.type === 'info' || !note.type) && <Info size={16} className="text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <p className={`text-sm truncate ${!note.read ? 'font-semibold text-text-main' : 'text-text-muted'}`}>
                            {note.title}
                        </p>
                        {!note.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5"></div>}
                    </div>
                    <p className="text-xs text-text-muted line-clamp-2 mt-0.5">{note.desc}</p>
                    <p className="text-[10px] text-text-muted mt-1.5">{note.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center flex flex-col items-center text-text-muted opacity-70">
                <Bell size={32} className="mb-2 opacity-50"/>
                <span className="text-sm">No new notifications</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border-color p-2 bg-card-bg">
              <Link 
                  to="/dashboard" 
                  onClick={onClose}
                  className="flex w-full items-center justify-center rounded-lg py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                  View All Notifications
              </Link>
          </div>
        </div>
      )}
    </div>
  );
};