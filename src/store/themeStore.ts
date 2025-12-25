import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ACCENT_COLORS = {
  blue: '#00d4ff',
  purple: '#d946ef',
  green: '#4ade80',
  orange: '#fb923c',
};

export type AccentColor = keyof typeof ACCENT_COLORS;

interface ThemeState {
  theme: 'dark' | 'light' | 'system';
  accentColor: AccentColor;
  density: 'comfortable' | 'compact';
  
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
  setAccentColor: (color: AccentColor) => void;
  setDensity: (density: 'comfortable' | 'compact') => void;
  
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      accentColor: 'blue',
      density: 'comfortable',

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      setAccentColor: (color) => {
        set({ accentColor: color });
        applyAccentColor(color);
      },

      setDensity: (density) => {
        set({ density });
        document.body.setAttribute('data-density', density);
      },

      initTheme: () => {
        const { theme, accentColor, density } = get();
        applyTheme(theme);
        applyAccentColor(accentColor);
        document.body.setAttribute('data-density', density);
      },
    }),
    {
      name: 'theme-preferences',
    }
  )
);


function applyTheme(theme: string) {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

function applyAccentColor(colorKey: AccentColor) {
  const root = window.document.documentElement;
  root.style.setProperty('--primary', ACCENT_COLORS[colorKey]);
}