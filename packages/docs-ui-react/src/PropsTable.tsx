import React from 'react';
import type { PropsTableProps } from './types';

export const PropsTable: React.FC<PropsTableProps> = ({ meta }) => {
  if (!meta.props || meta.props.length === 0) {
    return null;
  }

  return (
    <div className="props-table">
      <h4>Properties</h4>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {meta.props.map((prop) => (
            <tr key={prop.name}>
              <td className="prop-name">
                <code>{prop.name}</code>
              </td>
              <td className="prop-type">
                <code>{prop.type.name}</code>
              </td>
              <td className="prop-required">
                {prop.required ? (
                  <span className="required">Yes</span>
                ) : (
                  <span className="optional">No</span>
                )}
              </td>
              <td className="prop-default">
                {prop.default ? <code>{prop.default}</code> : <span className="no-default">-</span>}
              </td>
              <td className="prop-description">{prop.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
