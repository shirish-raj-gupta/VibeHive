'use client';

import { useState } from 'react';

export default function CreateEventPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
  
    if (!token || !userId) {
      console.error('Missing token or userId');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('userId', userId); // ✅ Add userId here
    if (image) formData.append('image', image);
  
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Only pass token in header
          // Do NOT set Content-Type to multipart/form-data manually!
        },
        body: formData,
      });
  
      console.log(response);
  
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
  
      setSuccess(true);
      setName('');
      setDate('');
      setLocation('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Create Event Error:', error);
    }
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

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter event name"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter event location"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Entry Fee (in ₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter event price"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Enter event description"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg px-4 py-3 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1D464A] text-white font-semibold rounded-lg hover:bg-[#145A59] transition duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
