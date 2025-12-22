import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  Icon: LucideIcon;
  delayClass: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, label, Icon, delayClass }) => {
  return (
    <div className={`relative w-full mt-8 transition-all duration-700 ${delayClass}`}>
      <input 
        type={type} 
        id={id} 
        required 
        placeholder=" " 
        className="
          peer 
          w-full 
          bg-transparent 
          border-0 
          border-b 
          border-white 
          text-white 
          placeholder-transparent 
          focus:outline-none 
          focus:border-neon-blue 
          pb-2 
          pr-8 
          transition-colors 
          duration-300
        "
      />
      
      {/* Label */}
      <label 
        htmlFor={id} 
        className="
          absolute 
          left-0 
          -top-5 
          text-sm 
          text-white 
          transition-all 
          duration-300 
          peer-placeholder-shown:text-base 
          peer-placeholder-shown:top-0 
          peer-focus:-top-5 
          peer-focus:text-sm 
          peer-focus:text-neon-blue
          pointer-events-none
        "
      >
        {label}
      </label>

      {/* Icon */}
      <Icon 
        size={20}
        className="
          absolute 
          right-0 
          bottom-2 
          text-white 
          transition-colors 
          duration-300 
          peer-focus:text-neon-blue
        " 
      />
    </div>
  );
};

export default InputField;