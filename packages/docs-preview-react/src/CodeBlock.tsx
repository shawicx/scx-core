import React, { useState, useCallback } from 'react';
import type { CodeBlockProps } from './types';
import './styles/CodeBlock.css';

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
  showLineNumbers = false,
  showCopy = true,
  title,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className="code-block">
      {title && <div className="code-block__title">{title}</div>}
      <div className="code-block__wrapper">
        {showLineNumbers && (
          <div className="code-block__lines">
            {lines.map((_, index) => (
              <div key={index} className="code-block__line-number">
                {index + 1}
              </div>
            ))}
          </div>
        )}
        <div className="code-block__content">
          <pre>
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
        {showCopy && (
          <button
            className="code-block__copy"
            onClick={handleCopy}
            type="button"
            aria-label={copied ? '已复制' : '复制代码'}
          >
            {copied ? '✓' : '复制'}
          </button>
        )}
      </div>
    </div>
  );
};
