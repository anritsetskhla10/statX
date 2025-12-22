import React from 'react';

interface SubmitButtonProps {
  children: React.ReactNode;
  delayClass: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, delayClass }) => {
  return (
    <div className={`mt-6 transition-all duration-700 ${delayClass}`}>
      <button type="submit" className="w-full h-11.25 bg-transparent border-2 border-neon-blue rounded-full cursor-pointer text-base font-semibold overflow-hidden relative group text-white z-10 hover:text-dark-bg hover:border-0 transition-colors duration-300">
        <span className="absolute w-full h-full  bg-neon-blue -left-full top-0 group-hover:left-0 transition-all duration-300 -z-10"></span>
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;