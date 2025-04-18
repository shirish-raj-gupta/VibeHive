'use client'; // Make sure this is a client component

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching events data
    setEvents([
      {
        id: 1,
        name: 'Music Concert',
        date: '2025-06-15',
        time: '7:00 PM',
        fee: '₹500',
        image: '/event1.jpg',
      },
      {
        id: 2,
        name: 'Startup Pitch Fest',
        date: '2025-07-01',
        time: '11:00 AM',
        fee: '₹1000',
        image: '/event2.jpg',
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg shadow-lg overflow-hidden bg-white">
            <img
              src={event.image}
              alt={event.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
              <p className="mt-2 font-medium text-blue-600">Entry Fee: {event.fee}</p>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-3 text-gray-600 text-lg">
                  <a href={`https://wa.me/?text=Check out this event: ${event.name}`} target="_blank"><FaWhatsapp /></a>
                  <a href={`https://instagram.com`} target="_blank"><FaInstagram /></a>
                  <a href={`https://twitter.com/intent/tweet?text=Check out this event: ${event.name}`} target="_blank"><FaTwitter /></a>
                </div>
                <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
