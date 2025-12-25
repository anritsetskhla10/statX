import React from 'react';
type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'primary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'neutral', 
  className = '' 
}) => {
  
  const variants = {
    success: 'bg-[#48dd84]/15 text-[#48dd84]', 
    warning: 'bg-[#48c4dd]/15 text-[#48c4dd]', 
    danger: 'bg-[#dd48c4]/15 text-[#dd48c4]',  
    primary: 'bg-primary/15 text-primary',     
    neutral: 'bg-input-bg text-text-muted',    
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};