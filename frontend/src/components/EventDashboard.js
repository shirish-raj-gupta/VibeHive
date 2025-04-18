// src/components/EventDashboard.js

import EventCard from './EventCard';

export default function EventDashboard({ events }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
