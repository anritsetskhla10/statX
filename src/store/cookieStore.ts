import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieStore {
  isOpen: boolean;
  preferences: CookiePreferences;
  hasConsent: boolean; 
  openModal: () => void;
  closeModal: () => void;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  saveConsent: () => void;
}

export const useCookieStore = create<CookieStore>()(
  persist(
    (set) => ({
      isOpen: false,
      hasConsent: false,
      preferences: {
        essential: true, 
        analytics: false,
        marketing: false,
      },
      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false }),
      updatePreferences: (prefs) => 
        set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
      acceptAll: () => {
        set({ 
          preferences: { essential: true, analytics: true, marketing: true }, 
          hasConsent: true,
          isOpen: false 
        });
      },
      saveConsent: () => set({ hasConsent: true, isOpen: false }),
    }),
    {
      name: 'statx-cookie-consent', 
    }
  )
);