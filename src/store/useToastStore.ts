import { create } from 'zustand';

interface ToastState {
  message: { type: 'success' | 'error'; text: string } | null;
  showToast: (type: 'success' | 'error', text: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  showToast: (type, text) => {
    set({ message: { type, text } });
    setTimeout(() => set({ message: null }), 3000);
  },
}));