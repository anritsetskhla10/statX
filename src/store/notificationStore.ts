import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface Notification {
  id: number;
  title: string;
  description: string; 
  created_at: string;
  is_read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  subscribeToRealtime: () => void;
  unsubscribeFromRealtime: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20); 

    if (error) {
      console.error('Error fetching notifications:', error);
      return;
    }

    set({ 
      notifications: data as Notification[],
      unreadCount: data.filter((n: Notification) => !n.is_read).length,
      loading: false 
    });
  },

  markAsRead: async (id: number) => {
    set(state => {
      const updated = state.notifications.map(n => n.id === id ? { ...n, is_read: true } : n);
      return {
        notifications: updated,
        unreadCount: updated.filter(n => !n.is_read).length
      };
    });


    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
  },

  markAllAsRead: async () => {
     const { data: { user } } = await supabase.auth.getUser();
     if(!user) return;

     set(state => ({
        notifications: state.notifications.map(n => ({ ...n, is_read: true })),
        unreadCount: 0
     }));

     await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id);
  },

  subscribeToRealtime: () => {
    supabase
      .channel('realtime:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
          const newNotif = payload.new as Notification;
          set(state => ({
            notifications: [newNotif, ...state.notifications],
            unreadCount: state.unreadCount + 1
          }));
      })
      .subscribe();
  },

  unsubscribeFromRealtime: () => {
    supabase.removeAllChannels();
  }
}));