import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore'; 
import { useToastStore } from '../../store/useToastStore';

import ProfileSidebar from './profile/ProfileSidebar'; 
import ProfileSettings from './profile/ProfileSettings';
import SecuritySettings from './profile/SecuritySettings';
import NotificationSettings from './profile/NotificationSettings';
import AppearanceSettings from './profile/AppearanceSettings';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { message } = useToastStore(); 

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  
  const [profileData, setProfileData] = useState({ fullName: '', email: '', bio: '', avatarUrl: null });

  useEffect(() => {
    if (!user) {
        return; 
    }

    async function getProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user!.id)
          .maybeSingle();

        if (error) throw error;

        setProfileData({
          fullName: data?.full_name || user!.user_metadata?.full_name || '',
          email: user!.email || '',
          bio: data?.bio || '',
          avatarUrl: data?.avatar_url || null,
        });

      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [user, navigate]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-dark-bg text-white"><Loader2 className="animate-spin" /></div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return user ? (
          <ProfileSettings 
            userId={user.id} 
            initialData={profileData} 
          />
        ) : null;
      
      case 'notifications':
        return <NotificationSettings />;
      
      case 'security':
        return <SecuritySettings />;

      case 'appearance':
        return <AppearanceSettings />;
      
      default:
        return <div className="text-gray-400">Section coming soon...</div>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 pb-20 bg-dark-bg min-h-screen">
      
      {/* Toast Notification */}
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-xl border backdrop-blur-md z-50 animate-in slide-in-from-right fade-in shadow-2xl
          ${message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-200' : 'bg-red-500/10 border-red-500 text-red-200'}`}>
          {message.text}
        </div>
      )}

      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1">
          <div className="bg-card-bg border border-white/5 rounded-3xl p-8 min-h-125">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;