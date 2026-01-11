import React from 'react';
import type { PreviewProps } from './types';
import './styles/Preview.css';

export const Preview: React.FC<PreviewProps> = ({
  children,
  width = 'full',
  background = 'white',
  bordered = false,
}) => {
  const className = `preview preview--${width} preview--${background}${bordered ? ' preview--bordered' : ''}`;

  return (
    <div className={className}>
      <div className="preview__content">{children}</div>
    </div>
  );
};
