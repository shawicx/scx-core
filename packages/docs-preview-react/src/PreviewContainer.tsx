import React from 'react';
import type { PreviewContainerProps } from './types';
import { Preview } from './Preview';
import { CodeBlock } from './CodeBlock';
import './styles/PreviewContainer.css';

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  children,
  code,
  language = 'tsx',
  showLineNumbers = false,
  showCopy = true,
  codeTitle,
  width = 'full',
  background = 'white',
  bordered = false,
}) => {
  return (
    <div className="preview-container">
      <Preview width={width} background={background} bordered={bordered}>
        {children}
      </Preview>
      <CodeBlock
        code={code}
        language={language}
        showLineNumbers={showLineNumbers}
        showCopy={showCopy}
        title={codeTitle}
      />
    </div>
  );
};
