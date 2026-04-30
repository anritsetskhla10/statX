import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Notification {
  id: string;
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
  realtimeChannel: RealtimeChannel | null;
  
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  subscribeToRealtime: () => Promise<void>;
  unsubscribeFromRealtime: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  realtimeChannel: null,

  fetchNotifications: async () => {
    set({ loading: true });
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      set({ loading: false });
      return;
    }

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20); 

    if (error) {
      console.error('Error fetching notifications:', error);
      set({ loading: false });
      return;
    }

    set({ 
      notifications: data as Notification[],
      unreadCount: data.filter((n: Notification) => !n.is_read).length,
      loading: false 
    });
  },

  markAsRead: async (id: string) => {
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

  subscribeToRealtime: async () => {
    if (get().realtimeChannel) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    console.log('Subscribing to realtime for user:', user.id);

    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          console.log('Realtime payload received:', payload);
          const newNotif = payload.new as Notification;
          set(state => ({
            notifications: [newNotif, ...state.notifications],
            unreadCount: state.unreadCount + 1
          }));
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    set({ realtimeChannel: channel });
  },

  unsubscribeFromRealtime: () => {
    const { realtimeChannel } = get();
    if (realtimeChannel) {
      console.log('Unsubscribing from realtime notifications');
      supabase.removeChannel(realtimeChannel);
      set({ realtimeChannel: null });
    }
  }
}));