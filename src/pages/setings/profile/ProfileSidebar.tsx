import React from 'react';
import { User, Bell, Shield, Palette } from 'lucide-react';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
];

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="bg-[#1e1e2f] border border-white/5 rounded-2xl p-2 sticky top-24">
        {menuItems.map((item) => (
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
  );
};

export default ProfileSidebar;