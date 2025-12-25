import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../../../lib/supabase';
import { passwordSchema, type PasswordFormValues } from '../../../lib/validation';
import { useToastStore } from '../../../store/useToastStore';

const SecuritySettings: React.FC = () => { 
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<PasswordFormValues>({ resolver: zodResolver(passwordSchema) });

  const onUpdatePassword = async (data: PasswordFormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({ password: data.password });
      if (error) throw error;
      showToast('success', 'პაროლი წარმატებით განახლდა!');
      reset();
    } catch (error: unknown) { showToast('error', (error as Error).message); }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("დარწმუნებული ხარ? ეს მოქმედება შეუქცევადია.")) return;
    try {
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;
      await supabase.auth.signOut();
      alert('ანგარიში წაიშალა.');
      navigate({ to: '/auth' });
    } catch (error: unknown) { showToast('error', (error as Error).message); }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <form onSubmit={handleSubmit(onUpdatePassword)} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-text-main mb-1">Security</h2>
          <p className="text-text-muted text-sm">Protect your account and data.</p>
        </div>

        <div className="bg-card-bg border border-border-color rounded-2xl p-6 space-y-4">
          <h3 className="text-text-main font-medium mb-2 flex items-center gap-2">
              <Lock size={18} className="text-primary"/> Change Password
          </h3>
          <div className="space-y-3">
            <input 
              type="password" placeholder="New Password" {...register("password")}
              className="w-full bg-input-bg border border-border-color rounded-lg px-4 py-2.5 text-text-main focus:border-primary focus:outline-none transition-colors" 
            />
          </div>
          <div className="flex justify-end mt-2">
            <button type="submit" disabled={isSubmitting} className="text-sm bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors font-medium flex items-center gap-2">
               {isSubmitting && <Loader2 className="animate-spin" size={14} />} Update Password
            </button>
          </div>
        </div>
      </form>

      <div className="bg-card-bg border border-red-500/30 rounded-2xl p-6 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 to-orange-600"></div>
        <h3 className="text-red-400 font-medium mb-2 flex items-center gap-2">
            <AlertTriangle size={18} /> Danger Zone
        </h3>
        <p className="text-text-muted text-sm">Once you delete your account, there is no going back.</p>
        <div className="flex justify-end mt-2">
          <button type="button" onClick={handleDeleteAccount} className="text-sm bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all font-medium flex items-center gap-2">
             <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;