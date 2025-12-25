import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-card-bg border border-border-color rounded-3xl p-(--space-card) shadow-sm transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};