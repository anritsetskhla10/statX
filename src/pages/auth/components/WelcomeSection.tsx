import React from 'react';

interface WelcomeSectionProps {
  isToggled: boolean;
  type: 'login' | 'signup';
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ isToggled, type }) => {
  const isLogin = type === 'login';
  
  const wrapperClass = isLogin
    ? `hidden md:flex absolute top-0 right-0 h-full w-1/2 justify-center flex-col text-right pr-10 pl-37.5 pb-15 transition-all duration-700 z-10 ${isToggled ? 'translate-x-[120%] opacity-0 blur-2.5' : 'translate-x-0 opacity-100 blur-0'}`
    : `hidden md:flex absolute top-0 left-0 h-full w-1/2 justify-center flex-col text-left pl-9.5 pr-37.5 pb-15 pointer-events-none transition-all duration-700 z-10 ${isToggled ? 'translate-x-0 opacity-100 blur-0' : '-translate-x-[120%] opacity-0 blur-2.5'}`;

  const textDelay = isLogin
    ? (!isToggled ? 'delay-2000' : 'delay-0')
    : (isToggled ? 'delay-1700' : 'delay-0');

  return (
    <div className={wrapperClass}>
      <h2 className={`text-4xl font-bold uppercase leading-snug text-white transition-all duration-700 ${textDelay}`}>
        {isLogin ? 'Welcome Back!' : 'Welcome!'}
      </h2>
    </div>
  );
};

export default WelcomeSection;