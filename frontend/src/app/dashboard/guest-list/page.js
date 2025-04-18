'use client';

import { useState } from 'react';

export default function GuestListPage() {
  const [guests, setGuests] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addGuest = (e) => {
    e.preventDefault();
    if (name && email) {
      setGuests([...guests, { name, email }]);
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-[#1D464A]">Guest List</h2>

      <form onSubmit={addGuest} className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guest Name</label>
          <input
            type="text"
            placeholder="Enter guest name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-[#1D464A] focus:border-[#1D464A] transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guest Email</label>
          <input
            type="email"
            placeholder="Enter guest email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg shadow-sm focus:ring-[#1D464A] focus:border-[#1D464A] transition-all"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#1D464A] text-white py-3 rounded-lg font-medium hover:bg-[#145A59] transition-all duration-300"
        >
          Add Guest
        </button>
      </form>

      {/* Guest List Display */}
      <ul className="space-y-4">
        {guests.map((guest, index) => (
          <li key={index} className="flex justify-between items-center border-b pb-3 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold">{guest.name}</h3>
              <p className="text-sm text-gray-500">{guest.email}</p>
            </div>
            <button 
              className="text-red-600 hover:underline text-sm"
              onClick={() => {
                const updatedGuests = guests.filter((_, i) => i !== index);
                setGuests(updatedGuests);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
