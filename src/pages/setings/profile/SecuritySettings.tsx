import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { passwordSchema, type PasswordFormValues } from '../../../lib/validation';

interface SecuritySettingsProps {
  onShowMessage: (type: 'success' | 'error', text: string) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onShowMessage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<PasswordFormValues>({ resolver: zodResolver(passwordSchema) });

  const onUpdatePassword = async (data: PasswordFormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) throw error;
      onShowMessage('success', 'პაროლი წარმატებით განახლდა!');
      reset();
    } catch (error: unknown) {
      onShowMessage('error', (error instanceof Error ? error.message : String(error)) || "პაროლის განახლება ვერ მოხერხდა");
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdatePassword)} className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Security</h2>
        <p className="text-gray-400 text-sm">Protect your account and data.</p>
      </div>

      <div className="bg-[#1e1e2f] border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-medium mb-2 flex items-center gap-2">
            <Lock size={18} className="text-[#dd48c4]"/> Change Password
        </h3>
        <div className="space-y-3">
          <input 
            type="password" 
            placeholder="New Password" 
            {...register("password")}
            className="w-full bg-[#161625] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#dd48c4] focus:outline-none transition-colors" 
          />
        </div>
        <div className="flex justify-end mt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="text-sm bg-[#dd48c4]/10 text-[#dd48c4] px-4 py-2 rounded-lg hover:bg-[#dd48c4]/20 transition-colors font-medium flex items-center gap-2"
          >
             {isSubmitting && <Loader2 className="animate-spin" size={14} />} Update Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default SecuritySettings;