'use client';

import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

export default function RSVPTrackerPage() {
  const [rsvps, setRsvps] = useState([
    { name: 'Alice', status: 'Yes' },
    { name: 'Bob', status: 'No' },
    { name: 'Charlie', status: 'Maybe' },
  ]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-[#1D464A] mb-6">RSVP Tracker</h2>

      <ul className="space-y-4">
        {rsvps.map((rsvp, index) => (
          <li key={index} className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-all">
            <div>
              <span className="text-xl font-semibold">{rsvp.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Status Icons with Text */}
              {rsvp.status === 'Yes' && (
                <FaCheckCircle className="text-green-600 text-2xl" />
              )}
              {rsvp.status === 'No' && (
                <FaTimesCircle className="text-red-600 text-2xl" />
              )}
              {rsvp.status === 'Maybe' && (
                <FaQuestionCircle className="text-yellow-600 text-2xl" />
              )}
              <span
                className={`font-medium ${rsvp.status === 'Yes' ? 'text-green-600' : rsvp.status === 'No' ? 'text-red-600' : 'text-yellow-600'}`}
              >
                {rsvp.status}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <button className="bg-[#1D464A] text-white py-2 px-6 rounded-lg hover:bg-[#145A59] transition-all">
          Add RSVP
        </button>
      </div>
    </div>
  );
}
