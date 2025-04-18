'use client'; // This ensures the component works on the client side using hooks

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function EventList({ events, onRegisterClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div key={event.id} className="border rounded-lg shadow-lg overflow-hidden bg-white">
          <img src={event.image} alt={event.name} className="h-48 w-full object-cover" />
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
              <button
                onClick={() => onRegisterClick(event.id)}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
