import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: LucideIcon;
  delayClass?: string;
  error?: string; // ახალი პროპი შეცდომისთვის
}

// forwardRef აუცილებელია React Hook Form-ისთვის!
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, Icon, delayClass, error, ...props }, ref) => {
    return (
      <div className={`relative my-4 ${delayClass || ''}`}>
        <input
          ref={ref} // <--- ეს არის მთავარი!
          className={`peer w-full border-b-2 bg-transparent py-2 pl-8 pr-2 text-white placeholder-transparent focus:outline-none transition-colors
            ${error ? 'border-red-500' : 'border-white/30 focus:border-neon-blue'}`}
          placeholder=" "
          {...props}
        />
        <label className={`absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm pointer-events-none
           ${error ? 'text-red-400' : 'text-neon-blue'}`}>
          {label}
        </label>
        <Icon className={`absolute right-0 top-2 ${error ? 'text-red-400' : 'text-gray-400'}`} size={18} />
        
        {/* შეცდომის ტექსტი ინპუტის ქვეშ */}
        {error && (
          <span className="absolute -bottom-5 left-0 text-xs text-red-400 animate-pulse">
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField"; // დებაგინგისთვის
export default InputField;