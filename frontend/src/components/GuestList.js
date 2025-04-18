// src/components/GuestList.js

export default function GuestList({ eventId, guests, onAddGuest, onRemoveGuest }) {
  const handleAddGuest = (guestName) => {
    onAddGuest(eventId, guestName);
  };

  const handleRemoveGuest = (guestName) => {
    onRemoveGuest(eventId, guestName);
  };

  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold">Guest List</h4>
      <ul className="list-disc ml-6 mt-4">
        {guests.map((guest, index) => (
          <li key={index} className="flex justify-between">
            {guest}
            <button
              onClick={() => handleRemoveGuest(guest)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add guest name"
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={() => handleAddGuest('New Guest')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
        >
          Add Guest
        </button>
      </div>
    </div>
  );
}
