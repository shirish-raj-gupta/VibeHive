import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function EventCard({ event, user }) {
  const router = useRouter();

  const handleRegister = () => {
    if (!user) {
      router.push('/login');  // Redirect to login page if user is not logged in
    } else {
      // Handle registration logic if the user is logged in
      // You can proceed with event registration, payment, etc.
      alert(`Registering for ${event.name}`);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
      <img
        src={event.image}
        alt={event.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{event.name}</h3>
        <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
        <p className="mt-2 font-medium text-blue-600">Entry Fee: {event.fee}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3 text-gray-600 text-lg">
            <a href={`https://wa.me/?text=Check out this event: ${event.name}`} target="_blank"><FaWhatsapp /></a>
            <a href={`https://instagram.com`} target="_blank"><FaInstagram /></a>
            <a href={`https://twitter.com/intent/tweet?text=Check out this event: ${event.name}`} target="_blank"><FaTwitter /></a>
          </div>
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
          >
            {user ? 'Register' : 'Login to Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
