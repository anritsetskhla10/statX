import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Mail, Save, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { profileSchema, type ProfileFormValues } from '../../../lib/validation';
import { useToastStore } from '../../../store/useToastStore';

interface ProfileSettingsProps {
  userId: string;
  initialData: { fullName: string; email: string; bio?: string; avatarUrl?: string | null };
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userId, initialData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToastStore();
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialData.avatarUrl || null);
  const [uploading, setUploading] = useState(false);

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
    if (initialData.avatarUrl) {
        setAvatarUrl(`${initialData.avatarUrl}?t=${new Date().getTime()}`);
    }
  }, [initialData, setValue]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) throw new Error('Select an image.');

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      const { error: updateError } = await supabase.from('profiles').upsert({ 
            id: userId, avatar_url: publicUrl, updated_at: new Date() 
        });
      if (updateError) throw updateError;

      setAvatarUrl(`${publicUrl}?t=${new Date().getTime()}`);
      showToast('success', 'ავატარი განახლდა!');
    } catch (error: unknown) {
      showToast('error', (error as Error).message || 'Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  const onUpdateProfile = async (data: ProfileFormValues) => {
    try {
      const { error } = await supabase.from('profiles').upsert({
          id: userId, full_name: data.fullName, bio: data.bio, updated_at: new Date(),
        }).eq('id', userId);
      if (error) throw error;
      showToast('success', 'პროფილი განახლდა!');
    } catch (error: unknown) {
      showToast('error', (error as Error).message || 'Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-text-main mb-1">Public Profile</h2>
        <p className="text-text-muted text-sm">This will be displayed on your public profile.</p>
      </div>

      <div className="flex items-center gap-6 p-6 bg-card-bg rounded-2xl border border-border-color shadow-sm">
        <div className="relative h-24 w-24">
            <div className="h-full w-full rounded-full bg-linear-to-tr from-blue-500 to-teal-400 border-2 border-card-bg flex items-center justify-center text-3xl font-bold text-white overflow-hidden shadow-md">
            {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
                initialData.fullName?.charAt(0).toUpperCase() || 'U'
            )}
            </div>
            {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" />
                </div>
            )}
        </div>

        <div className="space-y-2">
          <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-input-bg hover:bg-border-color text-text-main px-4 py-2 rounded-lg text-sm transition-colors border border-border-color"
          >
            <Camera size={16} /> {uploading ? 'Uploading...' : 'Change Avatar'}
          </button>
          <p className="text-xs text-text-muted">JPG, GIF or PNG. Max size 2MB</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm text-text-muted">Full Name</label>
          <input 
            type="text" {...register("fullName")}
            className="w-full bg-input-bg border border-border-color rounded-lg px-4 py-2.5 text-text-main focus:border-primary focus:outline-none transition-colors" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-text-muted">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-text-muted" size={18} />
            <input 
              type="email" {...register("email")} disabled
              className="w-full bg-input-bg/50 border border-border-color rounded-lg pl-10 pr-4 py-2.5 text-text-muted cursor-not-allowed" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-text-muted">Bio</label>
          <textarea 
            rows={4} {...register("bio")}
            className="w-full bg-input-bg border border-border-color rounded-lg px-4 py-2.5 text-text-main focus:border-primary focus:outline-none transition-colors" 
            placeholder="Tell us about yourself..." 
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" disabled={isSubmitting}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;