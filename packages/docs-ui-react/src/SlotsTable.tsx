import React from 'react';
import type { SlotsTableProps } from './types';

export const SlotsTable: React.FC<SlotsTableProps> = ({ slots }) => {
  if (!slots || slots.length === 0) {
    return null;
  }

  return (
    <div className="slots-table">
      <h4>Slots</h4>
      <table>
        <thead>
          <tr>
            <th>Slot</th>
            <th>Props</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.name}>
              <td className="slot-name">
                <code>{slot.name}</code>
              </td>
              <td className="slot-props">
                {slot.props && Object.keys(slot.props).length > 0 ? (
                  <ul className="slot-props-list">
                    {Object.entries(slot.props).map(([propName, propType]) => (
                      <li key={propName}>
                        <code>{propName}</code>: <code>{propType.name}</code>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="no-props">No props</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
