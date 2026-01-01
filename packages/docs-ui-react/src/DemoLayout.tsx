import React from 'react';
import type { DemoLayoutProps } from './types';

export const DemoLayout: React.FC<DemoLayoutProps> = ({ title, description, children }) => {
  return (
    <div className="demo-layout">
      {title && <h3 className="demo-title">{title}</h3>}
      {description && <p className="demo-description">{description}</p>}
      <div className="demo-content">{children}</div>
    </div>
  );
};
