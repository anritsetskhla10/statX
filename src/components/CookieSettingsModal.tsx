import { X, Cookie, ShieldCheck, BarChart3, Megaphone} from 'lucide-react';
import { useCookieStore } from '../store/cookieStore';
import type { LucideIcon } from 'lucide-react';
import { useEffect } from 'react';

interface CookieOptionProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

export const CookieSettingsModal = () => {
  const { isOpen, closeModal, preferences, updatePreferences, saveConsent, acceptAll } = useCookieStore();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-card-bg border border-border-color w-full max-w-lg rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-border-color flex justify-between items-start">
            <div className="flex gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg h-fit">
                    <Cookie size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-text-main">Cookie Preferences</h2>
                    <p className="text-text-muted text-sm mt-1">
                        Manage your privacy settings.
                    </p>
                </div>
            </div>
            <button onClick={closeModal} className="text-text-muted hover:text-text-main">
                <X size={20} />
            </button>
        </div>

        {/* Content - Toggles */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            
            {/* Essential (Locked) */}
            <CookieOption 
                icon={ShieldCheck}
                title="Essential Cookies"
                desc="Necessary for the website to function. Cannot be disabled."
                checked={true}
                disabled={true}
            />

            {/* Analytics */}
            <CookieOption 
                icon={BarChart3}
                title="Analytics"
                desc="Help us improve our website by collecting anonymous usage data."
                checked={preferences.analytics}
                onChange={() => updatePreferences({ analytics: !preferences.analytics })}
            />

            {/* Marketing */}
            <CookieOption 
                icon={Megaphone}
                title="Marketing"
                desc="Used to display relevant advertisements to you."
                checked={preferences.marketing}
                onChange={() => updatePreferences({ marketing: !preferences.marketing })}
            />
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border-color bg-input-bg/30 flex flex-col sm:flex-row gap-3 justify-end">
            <button 
                onClick={acceptAll}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex-1 sm:flex-none"
            >
                Accept All
            </button>
            <button 
                onClick={saveConsent}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-card-bg border border-border-color text-text-main hover:border-primary/50 transition-colors flex-1 sm:flex-none"
            >
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Options
const CookieOption = ({ icon: Icon, title, desc, checked, onChange, disabled }: CookieOptionProps) => (
    <div className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${checked ? 'border-primary/30 bg-primary/5' : 'border-border-color bg-input-bg/10'}`}>
        <div className={`mt-1 ${checked ? 'text-primary' : 'text-text-muted'}`}>
            <Icon size={20} />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-text-main text-sm">{title}</h3>
                
                {/* Custom Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={checked} 
                        onChange={onChange} 
                        disabled={disabled}
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 transition-colors
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}
                    `}></div>
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200
                        ${checked ? 'translate-x-5' : 'translate-x-0'}
                    `}></div>
                </label>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">{desc}</p>
        </div>
    </div>
);