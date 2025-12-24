import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Mail, Save, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { profileSchema, type ProfileFormValues } from '../../../lib/validation';

interface ProfileSettingsProps {
  userId: string;
  initialData: { fullName: string; email: string; bio?: string };
  onShowMessage: (type: 'success' | 'error', text: string) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userId, initialData, onShowMessage }) => {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { isSubmitting } 
  } = useForm<ProfileFormValues>({ 
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialData.fullName,
      email: initialData.email,
      bio: initialData.bio
    }
  });

  useEffect(() => {
    setValue('fullName', initialData.fullName);
    setValue('email', initialData.email);
    setValue('bio', initialData.bio || '');
  }, [initialData, setValue]);

  const onUpdateProfile = async (data: ProfileFormValues) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          updated_at: new Date(),
        })
        .eq('id', userId);

      if (error) throw error;
      onShowMessage('success', 'პროფილი წარმატებით განახლდა!');
    } catch  (err: unknown) {
      onShowMessage('error', (err instanceof Error ? err.message : String(err)) || "პროფილის განახლება ვერ მოხერხდა");
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Public Profile</h2>
        <p className="text-gray-400 text-sm">This will be displayed on your public profile.</p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
        <div className="h-20 w-20 rounded-full bg-linear-to-tr from-blue-500 to-teal-400 border-2 border-dark-bg flex items-center justify-center text-2xl font-bold text-white">
          {initialData.fullName?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="space-y-2">
          <button type="button" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/10">
            <Camera size={16} /> Change Avatar
          </button>
          <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size 800K</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Full Name</label>
          <input 
            type="text" 
            {...register("fullName")}
            className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#48c4dd] focus:outline-none transition-colors" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email Address (Read Only)</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="email" 
              {...register("email")}
              disabled
              className="w-full bg-[#161625]/50 border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-gray-400 cursor-not-allowed" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Bio</label>
          <textarea 
            rows={4} 
            {...register("bio")}
            className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#48c4dd] focus:outline-none transition-colors" 
            placeholder="Tell us about yourself..." 
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-[#48c4dd] text-dark-bg px-6 py-2.5 rounded-lg font-semibold hover:bg-white transition-colors disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;