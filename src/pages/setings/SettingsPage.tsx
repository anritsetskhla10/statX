import  { useState } from 'react';
import { User, Bell, Shield, Palette, Save, Camera, Mail } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');


  const Toggle = ({ label, checked }: { label: string; checked?: boolean }) => {
    const [isOn, setIsOn] = useState(checked || false);
    return (
      <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
        <span className="text-gray-300 text-sm">{label}</span>
        <button 
          onClick={() => setIsOn(!isOn)}
          className={`w-11 h-6 rounded-full transition-colors relative ${isOn ? 'bg-[#48dd84]' : 'bg-white/10'}`}
        >
          <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Public Profile</h2>
              <p className="text-gray-400 text-sm">This will be displayed on your profile.</p>
            </div>

            {/* Avatar Upload */}
            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
              <div className="h-20 w-20 rounded-full bg-linear-to-tr from-blue-500 to-teal-400 border-2 border-dark-bg flex items-center justify-center text-2xl font-bold text-white">
                JD
              </div>
              <div className="space-y-2">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/10">
                  <Camera size={16} /> Change Avatar
                </button>
                <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 800K</p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">First Name</label>
                  <input type="text" defaultValue="John" className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#48c4dd] focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#48c4dd] focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-gray-500" size={18} />
                  <input type="email" defaultValue="john.doe@example.com" className="w-full bg-[#161625] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#48c4dd] focus:outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Bio</label>
                <textarea rows={4} className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#48c4dd] focus:outline-none transition-colors" defaultValue="Lead Developer at Neon Tech." />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="flex items-center gap-2 bg-[#48c4dd] text-dark-bg px-6 py-2.5 rounded-lg font-semibold hover:bg-white transition-colors">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
              <p className="text-gray-400 text-sm">Manage how we communicate with you.</p>
            </div>

            <div className="bg-[#1e1e2f] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Mail size={18} className="text-[#48dd84]" /> Email Alerts
              </h3>
              <div className="space-y-1">
                <Toggle label="Weekly Performance Report" checked={true} />
                <Toggle label="New User Signups" checked={true} />
                <Toggle label="System Maintenance Alerts" checked={false} />
              </div>
            </div>

            <div className="bg-[#1e1e2f] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Bell size={18} className="text-[#dd48c4]" /> Push Notifications
              </h3>
              <div className="space-y-1">
                <Toggle label="Real-time Revenue Updates" checked={true} />
                <Toggle label="Security Alerts" checked={true} />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Security</h2>
              <p className="text-gray-400 text-sm">Protect your account and data.</p>
            </div>

            <div className="bg-[#1e1e2f] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-medium mb-2">Change Password</h3>
              <div className="space-y-3">
                <input type="password" placeholder="Current Password" className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#dd48c4] focus:outline-none transition-colors" />
                <input type="password" placeholder="New Password" className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#dd48c4] focus:outline-none transition-colors" />
              </div>
              <button className="mt-2 text-sm text-[#dd48c4] hover:underline font-medium">Update Password</button>
            </div>

            <div className="bg-[#1e1e2f] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account.</p>
              </div>
              <Toggle label="" checked={false} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 pb-20">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Menu */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-[#1e1e2f] border border-white/5 rounded-2xl p-2 sticky top-24">
            {[
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'security', icon: Shield, label: 'Security' },
              { id: 'appearance', icon: Palette, label: 'Appearance' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 last:mb-0
                  ${activeTab === item.id 
                    ? 'bg-[#48c4dd]/10 text-[#48c4dd]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-[#1e1e2f] border border-white/5 rounded-3xl p-8 min-h-125">
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;