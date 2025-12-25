import React from 'react';

interface SubmitButtonProps {
  children: React.ReactNode;
  delayClass: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, delayClass, disabled }) => {
  return (
    <div className={`mt-6 transition-all duration-700 ${delayClass}`}>
      <button 
        type="submit" 
        disabled={disabled} 
        className="w-full h-11.25 bg-transparent border-2 border-primary rounded-full cursor-pointer text-base font-semibold overflow-hidden relative group text-text-main z-10 hover:text-dark-bg hover:border-0 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute w-full h-full bg-primary -left-full top-0 group-hover:left-0 transition-all duration-300 -z-10"></span>
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;