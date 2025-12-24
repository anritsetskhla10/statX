import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { registerSchema, type RegisterFormValues } from '../../lib/validation';

import InputField from './components/InputField';
import SubmitButton from './components/SubmitButton';
import ToggleText from './components/ToggleText';

interface RegisterFormProps {
  isToggled: boolean;
  onToggle: () => void;
  onError: (msg: string | null) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isToggled, onToggle, onError }) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onRegister = async (data: RegisterFormValues) => {
    onError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.username },
        },
      });
      if (error) throw error;
      alert('რეგისტრაცია წარმატებულია! გთხოვთ შეამოწმოთ ელ-ფოსტა.');
      reset(); 
      onToggle(); 
    } catch (err: unknown) {
      onError((err instanceof Error ? err.message : String(err)) || "რეგისტრაცია ვერ მოხერხდა");
    }
  };

  return (
    <div className={`absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-15 transition-all duration-700 ease-in-out z-20
      ${isToggled ? 'translate-x-0 opacity-100' : 'md:translate-x-[120%] opacity-0 pointer-events-none md:blur-2.5'}`}>
      
      <h2 className={`text-3xl font-bold text-center mb-6 transition-all duration-700 ${isToggled ? 'delay-1700' : ''}`}>Register</h2>
      
      <form onSubmit={handleSubmit(onRegister)}>
        <InputField 
          label="Username" 
          Icon={User} 
          type="text"
          delayClass={isToggled ? 'delay-1800' : 'delay-0'}
          error={errors.username?.message}
          {...register("username")}
        />

        <InputField 
          label="Email" 
          Icon={Mail} 
          type="email"
          delayClass={isToggled ? 'delay-1900' : 'delay-100'}
          error={errors.email?.message}
          {...register("email")}
        />

        <InputField 
          label="Password" 
          Icon={Lock} 
          type="password"
          delayClass={isToggled ? 'delay-2000' : 'delay-200'}
          error={errors.password?.message}
          {...register("password")}
        />

        <SubmitButton delayClass={isToggled ? 'delay-2100' : 'delay-300'} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'Register'}
        </SubmitButton>

        <ToggleText 
          text="Already have an account?" linkText="Sign In" onToggle={onToggle}
          delayClass={isToggled ? 'delay-2200' : 'delay-400'}
        />
      </form>
    </div>
  );
};

export default RegisterForm;