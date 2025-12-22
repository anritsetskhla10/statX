import React, { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import InputField from './components/InputField';
import SubmitButton from './components/SubmitButton';
import ToggleText from './components/ToggleText';
import BackgroundShapes from './components/BackgroundShapes';
import WelcomeSection from './components/WelcomeSection';

const AuthForm: React.FC = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const toggleForm = () => {
    setIsToggled(!isToggled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-dark-bg p-5 font-poppins text-white overflow-hidden">
      
      <div className={`relative w-full max-w-200 h-125 border-2 border-neon-blue shadow-[0_0_25px_#00d4ff] overflow-hidden transition-all duration-500 ${isToggled ? 'h-auto min-h-150 md:h-125' : ''}`}>

        <BackgroundShapes isToggled={isToggled} />

        <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col justify-center px-10 transition-all duration-700 ease-in-out z-20
          ${isToggled ? 'md:-translate-x-[120%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
          
          <h2 className={`text-3xl font-bold text-center mb-2 transition-all duration-700 ${!isToggled ? 'delay-2100' : ''}`}>Login</h2>
          
          <form onSubmit={handleSubmit}>
            <InputField 
              id="login-user" type="text" label="Username" Icon={User} 
              delayClass={!isToggled ? 'delay-2200' : 'delay-0'} 
            />
            <InputField 
              id="login-pass" type="password" label="Password" Icon={Lock} 
              delayClass={!isToggled ? 'delay-2300' : 'delay-100'} 
            />

            <SubmitButton delayClass={!isToggled ? 'delay-2400' : 'delay-200'}>
              Login
            </SubmitButton>

            <ToggleText 
              text="Don't have an account?" linkText="Sign Up" onToggle={toggleForm}
              delayClass={!isToggled ? 'delay-2500' : 'delay-300'}
            />
          </form>
        </div>

        <WelcomeSection isToggled={isToggled} type="login" />

        <div className={`absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-15 transition-all duration-700 ease-in-out z-20
          ${isToggled ? 'translate-x-0 opacity-100' : 'md:translate-x-[120%] opacity-0 pointer-events-none md:blur-2.5'}`}>
          
          <h2 className={`text-3xl font-bold text-center mb-2 transition-all duration-700 ${isToggled ? 'delay-1700' : ''}`}>Register</h2>
          
          <form onSubmit={handleSubmit}>
            <InputField 
              id="reg-user" type="text" label="Username" Icon={User} 
              delayClass={isToggled ? 'delay-1800' : 'delay-0'} 
            />
            <InputField 
              id="reg-email" type="email" label="Email" Icon={Mail} 
              delayClass={isToggled ? 'delay-1900' : 'delay-100'} 
            />
            <InputField 
              id="reg-pass" type="password" label="Password" Icon={Lock} 
              delayClass={isToggled ? 'delay-2000' : 'delay-200'} 
            />

            <SubmitButton delayClass={isToggled ? 'delay-2100' : 'delay-300'}>
              Register
            </SubmitButton>

            <ToggleText 
              text="Already have an account?" linkText="Sign In" onToggle={toggleForm}
              delayClass={isToggled ? 'delay-2200' : 'delay-400'}
            />
          </form>
        </div>

        <WelcomeSection isToggled={isToggled} type="signup" />

      </div>
    </div>
  );
};

export default AuthForm;