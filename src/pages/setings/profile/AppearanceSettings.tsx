import { Sun, Moon, Monitor, LayoutTemplate, Type, MousePointer2 } from 'lucide-react';
import { useThemeStore, ACCENT_COLORS, type AccentColor } from '../../../store/themeStore';

const AppearanceSettings = () => {
  const { theme, setTheme, accentColor, setAccentColor, density, setDensity } = useThemeStore();

  const colors = Object.entries(ACCENT_COLORS).map(([id, value]) => ({
    id: id as AccentColor, value, label: id.charAt(0).toUpperCase() + id.slice(1) 
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-text-main mb-1">Appearance</h2>
        <p className="text-text-muted text-sm">Customize how StatX looks on your device.</p>
      </div>

      <section className="space-y-4">
        <h3 className="text-text-main font-medium flex items-center gap-2">
          <Sun size={18} className="text-text-muted" /> Interface Theme
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'light', icon: Sun, label: 'Light Mode' },
            { id: 'dark', icon: Moon, label: 'Dark Mode' },
            { id: 'system', icon: Monitor, label: 'System' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTheme(item.id as 'light' | 'dark' | 'system')}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200
                ${theme === item.id 
                  ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                  : 'bg-card-bg border-border-color text-text-muted hover:bg-text-muted/5'
                }`}
            >
              <item.icon size={24} className={theme === item.id ? 'text-primary' : ''} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <hr className="border-border-color" />

      <section className="space-y-4">
        <h3 className="text-text-main font-medium flex items-center gap-2">
          <LayoutTemplate size={18} className="text-text-muted" /> Accent Color
        </h3>
        <div className="flex gap-4">
          {colors.map((color) => (
            <button
              key={color.id} onClick={() => setAccentColor(color.id)} 
              className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110
                ${accentColor === color.id ? 'ring-2 ring-border-color ring-offset-2 ring-offset-card-bg' : ''}`}
              style={{ background: color.value }}
              title={color.label}
            >
              {accentColor === color.id && <div className="w-2 h-2 bg-white rounded-full shadow-lg" />}
            </button>
          ))}
        </div>
      </section>

      <hr className="border-border-color" />

      <section className="space-y-4">
        <h3 className="text-text-main font-medium flex items-center gap-2">
          <MousePointer2 size={18} className="text-text-muted" /> Interface Density
        </h3>
        <div className="bg-input-bg border border-border-color rounded-xl p-1 flex">
          {[
            { id: 'comfortable', label: 'Comfortable', icon: LayoutTemplate },
            { id: 'compact', label: 'Compact', icon: Type },
          ].map((item) => (
            <button
              key={item.id} onClick={() => setDensity(item.id as 'comfortable' | 'compact')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all
                ${density === item.id 
                  ? 'bg-card-bg text-primary shadow-sm border border-border-color' 
                  : 'text-text-muted hover:text-text-main'
                }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AppearanceSettings;