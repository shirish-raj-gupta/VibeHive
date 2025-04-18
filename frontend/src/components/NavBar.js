import { FaHome, FaStar, FaCalendarAlt, FaSignInAlt } from 'react-icons/fa'; // Correct icon imports

export default function Navbar() {
  return (
    <header className="px-6 py-4 shadow-lg bg-[rgba(29,70,74,1)] text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          VibeHive
        </h1>

        {/* Navigation Links */}
        <nav className="space-x-6 flex items-center">
          <a href="/" className="hover:underline flex items-center space-x-2">
            <FaHome className="text-lg" />
            <span>Home</span>
          </a>
          <a href="/#features" className="hover:underline flex items-center space-x-2">
            <FaStar className="text-lg" /> {/* Replaced FaFeature with FaStar */}
            <span>Features</span>
          </a>
          <a href="/events" className="hover:underline flex items-center space-x-2">
            <FaCalendarAlt className="text-lg" />
            <span>Events</span>
          </a>
          <a href="/login" className="hover:underline flex items-center space-x-2">
            <FaSignInAlt className="text-lg" />
            <span>Login</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
