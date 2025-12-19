import React from 'react';
import type { HooksPanelProps } from './types';

export const HooksPanel: React.FC<HooksPanelProps> = ({ hooks }) => {
  if (!hooks || hooks.length === 0) {
    return null;
  }

  return (
    <div className="hooks-panel">
      <h4>Related Hooks</h4>
      <ul className="hooks-list">
        {hooks.map((hook) => (
          <li key={hook} className="hook-item">
            <code>{hook}</code>
          </li>
        ))}
      </ul>
    </div>
  );
};
