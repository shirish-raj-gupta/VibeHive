'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Mock fetch for user tickets – replace with actual API or localStorage logic
    const mockTickets = [
      {
        id: 1,
        eventName: 'VibeFest 2025',
        date: '2025-06-15',
        location: 'Downtown Arena, LA',
        attendees: 2,
        ticketId: 'VH-2301A',
      },
      {
        id: 2,
        eventName: 'Glow Night',
        date: '2025-07-02',
        location: 'Sunset Club, Miami',
        attendees: 1,
        ticketId: 'VH-2317B',
      },
    ];
    setTickets(mockTickets);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-[#1D464A]">My Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500">You haven’t registered for any events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-xl shadow-md p-5"
            >
              <h3 className="text-xl font-semibold text-[#1D464A]">{ticket.eventName}</h3>
              <p className="text-gray-600">Date: {ticket.date}</p>
              <p className="text-gray-600">Location: {ticket.location}</p>
              <p className="text-gray-600">Attendees: {ticket.attendees}</p>
              <p className="text-sm text-gray-500 mt-2">Ticket ID: <span className="font-mono">{ticket.ticketId}</span></p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
