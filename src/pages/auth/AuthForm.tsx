import React, { useState } from 'react';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm';
import BackgroundShapes from './components/BackgroundShapes';
import WelcomeSection from './components/WelcomeSection';

const AuthForm: React.FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const toggleForm = () => {
    setIsToggled(!isToggled);
    setGlobalError(null);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-dark-bg p-5 font-poppins text-text-main overflow-hidden relative">
      
      {/* Toast Notification */}
      {globalError && (
        <div className="absolute top-10 z-50 animate-bounce bg-red-500/20 border border-red-500 text-red-100 px-6 py-3 rounded-xl backdrop-blur-md">
          {globalError}
        </div>
      )}

      <div className={`relative w-full max-w-200 h-125 border-2 border-primary shadow-[0_0_25px_var(--primary)] overflow-hidden transition-all duration-500 ${isToggled ? 'h-auto min-h-150 md:h-125' : ''}`}>

        <BackgroundShapes isToggled={isToggled} />

        {/* --- LOGIN --- */}
        <LoginForm 
          isToggled={isToggled} 
          onToggle={toggleForm} 
          onError={setGlobalError} 
        />

        <WelcomeSection isToggled={isToggled} type="login" />

        {/* --- REGISTER --- */}
        <RegisterForm 
          isToggled={isToggled} 
          onToggle={toggleForm} 
          onError={setGlobalError} 
        />

        <WelcomeSection isToggled={isToggled} type="signup" />

      </div>
    </div>
  );
};

export default AuthForm;