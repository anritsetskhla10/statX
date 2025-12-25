import React, { forwardRef, useState } from 'react';
import { type LucideIcon, Eye, EyeOff } from 'lucide-react'; 

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: LucideIcon;
  delayClass?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, Icon, delayClass, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`relative w-full mt-6 mb-2 ${delayClass || ''}`}>
        <input
          ref={ref}
          type={isPasswordType ? (showPassword ? 'text' : 'password') : type}
          className={`peer w-full border-b-2 bg-transparent py-2 pl-8 pr-8 text-text-main placeholder-transparent focus:outline-none transition-colors
            ${error ? 'border-red-500' : 'border-text-muted/30 focus:border-primary'}`}
          placeholder=" "
          {...props}
        />
        
        <label className={`absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-text-muted peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm pointer-events-none
           ${error ? 'text-red-400' : 'text-primary'}`}>
          {label}
        </label>
        
        {isPasswordType ? (
          <button
            type="button" 
            onClick={togglePasswordVisibility}
            className={`absolute right-0 top-2 cursor-pointer focus:outline-none transition-colors duration-300 hover:text-primary
              ${error ? 'text-red-400' : 'text-text-muted'}`}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        ) : (
          <Icon 
            className={`absolute right-0 top-2 ${error ? 'text-red-400' : 'text-text-muted'}`} 
            size={18} 
          />
        )}
        
        {error && (
          <div className="mt-1 text-xs text-red-400 animate-pulse text-left font-medium">
            {error}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;