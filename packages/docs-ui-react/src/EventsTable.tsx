import React from 'react';
import type { EventsTableProps } from './types';

export const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="events-table">
      <h4>Events</h4>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Payload Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.name}>
              <td className="event-name">
                <code>{event.name}</code>
              </td>
              <td className="event-payload">
                {event.payload ? (
                  <code>{event.payload.name}</code>
                ) : (
                  <span className="no-payload">void</span>
                )}
              </td>
              <td className="event-description">{event.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
