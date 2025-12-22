import React from 'react';

interface ToggleTextProps {
  text: string;
  linkText: string;
  onToggle: () => void;
  delayClass: string;
}

const ToggleText: React.FC<ToggleTextProps> = ({ text, linkText, onToggle, delayClass }) => {
  return (
    <div className={`text-center mt-5 text-sm transition-all duration-700 ${delayClass}`}>
      <p>{text} <br />
        <span onClick={onToggle} className="text-neon-blue font-semibold cursor-pointer hover:underline">
          {linkText}
        </span>
      </p>
    </div>
  );
};

export default ToggleText;