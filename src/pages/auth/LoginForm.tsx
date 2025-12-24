import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { loginSchema, type LoginFormValues } from '../../lib/validation';

import InputField from './components/InputField';
import SubmitButton from './components/SubmitButton';
import ToggleText from './components/ToggleText';

interface LoginFormProps {
  isToggled: boolean;
  onToggle: () => void;
  onError: (msg: string | null) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isToggled, onToggle, onError }) => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = async (data: LoginFormValues) => {
    onError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      navigate({ to: '/profile' });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "შესვლა ვერ მოხერხდა";
      onError(errorMessage);
    }
  };

  return (
    <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col justify-center px-10 transition-all duration-700 ease-in-out z-20
      ${isToggled ? 'md:-translate-x-[120%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
      
      <h2 className={`text-3xl font-bold text-center mb-6 transition-all duration-700 ${!isToggled ? 'delay-2100' : ''}`}>Login</h2>
      
      <form onSubmit={handleSubmit(onLogin)}>
        <InputField 
          label="Email" 
          Icon={Mail} 
          type="email"
          delayClass={!isToggled ? 'delay-2200' : 'delay-0'}
          error={errors.email?.message} 
          {...register("email")} 
        />
        
        <InputField 
          label="Password" 
          Icon={Lock} 
          type="password"
          delayClass={!isToggled ? 'delay-2300' : 'delay-100'}
          error={errors.password?.message}
          {...register("password")}
        />

        <SubmitButton delayClass={!isToggled ? 'delay-2400' : 'delay-200'} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'Login'}
        </SubmitButton>

        <ToggleText 
          text="Don't have an account?" linkText="Sign Up" onToggle={onToggle}
          delayClass={!isToggled ? 'delay-2500' : 'delay-300'}
        />
      </form>
    </div>
  );
};

export default LoginForm;