import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <div className="flex justify-between items-end mb-(--space-layout)">
      <div>
        <h1 className="text-3xl font-bold text-text-main mb-2">{title}</h1>
        {description && <p className="text-text-muted">{description}</p>}
      </div>
      {action && <div className="text-right">{action}</div>}
    </div>
  );
};