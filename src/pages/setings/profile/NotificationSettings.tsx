import { useState } from 'react';
import { Mail } from 'lucide-react';

const Toggle = ({ label, checked }: { label: string; checked?: boolean }) => {
  const [isOn, setIsOn] = useState(checked || false);
  return (
    <div className="flex items-center justify-between py-4 border-b border-border-color last:border-0">
      <span className="text-text-muted text-sm">{label}</span>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-11 h-6 rounded-full transition-colors relative ${isOn ? 'bg-primary' : 'bg-input-bg'}`}
      >
        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-text-main mb-1">Notifications</h2>
        <p className="text-text-muted text-sm">Manage how we communicate with you.</p>
      </div>
      <div className="bg-card-bg border border-border-color rounded-2xl p-6 shadow-sm">
        <h3 className="text-text-main font-medium mb-4 flex items-center gap-2">
          <Mail size={18} className="text-primary" /> Email Alerts
        </h3>
        <div className="space-y-1">
          <Toggle label="Weekly Performance Report" checked={true} />
          <Toggle label="New User Signups" checked={true} />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;