import React from 'react';
import type { PreviewProps } from './types';
import './styles/Preview.css';

export const Preview: React.FC<PreviewProps> = ({
  children,
  title,
  description,
  width = 'full',
  background = 'white',
  bordered = false,
}) => {
  const className = `preview preview--${width} preview--${background}${bordered ? ' preview--bordered' : ''}`;

  return (
    <div className={className}>
      {(title || description) && (
        <div className="preview__header">
          {title && <div className="preview__title">{title}</div>}
          {description && <div className="preview__description">{description}</div>}
        </div>
      )}
      <div className="preview__content">{children}</div>
    </div>
  );
};
