'use client';

import { useState } from 'react';

export default function CreateEventPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      name,
      date,
      location,
      description,
    };

    console.log('Event Created:', newEvent);
    setSuccess(true);

    // Reset form
    setName('');
    setDate('');
    setLocation('');
    setDescription('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f4f5f7] via-[#e4e7eb] to-[#ccd0d5]">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-[#1D464A] mb-6">Create New Event</h2>
        
        {success && (
          <div className="mb-6 text-green-600 font-semibold text-lg p-3 bg-green-100 rounded-lg shadow-md">
            Event created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter event name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D464A] focus:border-[#1D464A] transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D464A] focus:border-[#1D464A] transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter event location"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D464A] focus:border-[#1D464A] transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Enter event description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1D464A] focus:border-[#1D464A] transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1D464A] text-white font-semibold rounded-lg hover:bg-[#145A59] active:bg-[#103E3D] focus:outline-none focus:ring-4 focus:ring-[#1D464A] transition-all duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
