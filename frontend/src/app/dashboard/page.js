'use client';

import { useState, useEffect } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import EventDashboard from '../../components/EventDashboard';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setUser({
      name: 'John Doe',
      email: 'john@example.com',
    });

    setEvents([
      {
        id: 1,
        name: 'Tech Meetup',
        date: '2025-05-15',
        location: 'New York, NY',
        rsvpCount: 25,
      },
      {
        id: 2,
        name: 'Wedding Celebration',
        date: '2025-06-25',
        location: 'Los Angeles, CA',
        rsvpCount: 120,
      },
    ]);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f4f5f7] via-[#e4e7eb] to-[#ccd0d5]">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Profile Header */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow-xl mb-12">
          <div className="flex items-center gap-6">
            <div className="bg-indigo-600 text-white p-4 rounded-full">
              <span className="text-3xl font-semibold">JD</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Event Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-indigo-600">{new Date(event.date).toLocaleDateString()}</p>
              <div className="mt-4">
                <span className="text-lg font-semibold">{event.rsvpCount} RSVPs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
