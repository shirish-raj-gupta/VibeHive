'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState(1); // Start with 1 attendee
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setAttendees(1); // Reset attendees to 1
    setShowModal(true);
  };

  const handleAttendeesChange = (operation) => {
    if (operation === 'increment') {
      setAttendees((prev) => prev + 1);
    } else if (operation === 'decrement' && attendees > 1) {
      setAttendees((prev) => prev - 1);
    }
  };

  const handleConfirmRegistration = () => {
    // Registration logic (API call or local storage) goes here
    alert(`Registered for ${selectedEvent.name} with ${attendees} attendees.`);
    setShowModal(false); // Close the modal after registration
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#1D464A]">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg shadow-lg overflow-hidden bg-white transform transition-all duration-300 hover:scale-105">
            <img
              src={event.image}
              alt={event.name}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#1D464A]">{event.name}</h2>
              <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
              <p className="mt-2 font-medium text-blue-600">Entry Fee: {event.fee}</p>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-3 text-gray-600 text-lg">
                  <a href={`https://wa.me/?text=Check out this event: ${event.name}`} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="hover:text-[#25D366]" />
                  </a>
                  <a href={`https://instagram.com`} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="hover:text-[#E1306C]" />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=Check out this event: ${event.name}`} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="hover:text-[#1DA1F2]" />
                  </a>
                </div>
                <button 
                  className="bg-[#1D464A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#145A59] transition-all duration-300"
                  onClick={() => handleRegister(event)}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#1D464A]">{selectedEvent.name}</h2>
            <p className="text-sm text-gray-500">{selectedEvent.date} at {selectedEvent.time}</p>
            <p className="font-medium text-blue-600">Entry Fee: {selectedEvent.fee}</p>

            <div className="mt-4 flex justify-center items-center gap-4">
              <button 
                onClick={() => handleAttendeesChange('decrement')}
                className="bg-[#1D464A] text-white p-3 rounded-full hover:bg-[#145A59] transition-all duration-200"
              >
                -
              </button>
              <span className="text-xl">{attendees}</span>
              <button 
                onClick={() => handleAttendeesChange('increment')}
                className="bg-[#1D464A] text-white p-3 rounded-full hover:bg-[#145A59] transition-all duration-200"
              >
                +
              </button>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={handleConfirmRegistration} 
                className="bg-[#1D464A] text-white px-6 py-2 rounded-lg hover:bg-[#145A59] transition-all duration-300"
              >
                Confirm Registration
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-red-600 hover:underline text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
