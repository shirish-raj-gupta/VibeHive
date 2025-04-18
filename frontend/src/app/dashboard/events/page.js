'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

const getEventsFromDB = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/eventslist');
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState('yes'); // Default confirmation is 'yes'

  useEffect(() => {
    const fetchEvents = async () => {
      const rawEvents = await getEventsFromDB();
      setEvents(rawEvents);
    };

    fetchEvents();
  }, []);

  const increment = (eventId) => {
    setAttendees((prev) => ({
      ...prev,
      [eventId]: Math.min((prev[eventId] || 1) + 1, 6),
    }));
  };

  const decrement = (eventId) => {
    setAttendees((prev) => ({
      ...prev,
      [eventId]: Math.max((prev[eventId] || 1) - 1, 1),
    }));
  };

  const handleRegistration = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/registerEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventId: selectedEvent.eventId,
        attendees: attendees[selectedEvent.eventId] || 1,
        confirmation, // Use selected confirmation value
      }),
    });
    console.log(response);
    

    const result = await response.json();
    alert(result.message);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D464A]">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.eventId}
            className="border rounded-lg shadow-lg bg-white transform transition-all duration-300 hover:scale-105"
          >
            {event.image ? (
              <img src={event.image} alt={event.name} className="h-48 w-full object-cover" />
            ) : (
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#1D464A]">{event.name}</h2>
              <p className="text-sm text-gray-500">{event.date} at {event.location}</p>
              <p className="text-sm text-gray-600">Organizer: <span className="font-medium">{event.createdBy.name}</span></p>
              <p className="text-sm text-gray-600">Phone: <span className="font-medium">{event.createdBy.phone}</span></p>
              <p className="mt-2 font-medium text-blue-600">Entry Fee: ₹{event.price}</p>

              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => decrement(event.eventId)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{attendees[event.eventId] || 1}</span>
                <button onClick={() => increment(event.eventId)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>

              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setShowModal(true);
                }}
                className="mt-2 w-full bg-[#1D464A] text-white py-2 rounded"
              >
                Register
              </button>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-3 text-gray-600 text-lg">
                  <a href={`https://wa.me/?text=Check out this event: ${event.name}`} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="hover:text-[#25D366]" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="hover:text-[#E1306C]" />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=Check out this event: ${event.name}`} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="hover:text-[#1DA1F2]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowModal(false)}>✕</button>
            <h2 className="text-xl font-semibold mb-4">Confirm Registration</h2>
            <p>Event: <strong>{selectedEvent.name}</strong></p>
            <p>Attendees: <strong>{attendees[selectedEvent.eventId] || 1}</strong></p>
            <p>Total: ₹{selectedEvent.price * (attendees[selectedEvent.eventId] || 1)}</p>

            {/* Confirmation Dropdown */}
            <div className="mt-4">
              <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700">Confirmation</label>
              <select
                id="confirmation"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
              </select>
            </div>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleRegistration}
            >
              Pay & Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
