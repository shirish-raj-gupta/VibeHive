'use client';

import '../globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaHome,
  FaCalendarAlt,
  FaListAlt,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaTicketAlt,
} from 'react-icons/fa';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#112D2F] via-[#1D464A] to-[#233F40] text-white p-6 flex flex-col shadow-2xl border-r border-black/20 z-10">
        {/* Logo */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-widest drop-shadow-md text-white">VibeHive</h1>
          <div className="h-[3px] w-24 bg-black mx-auto mt-3 rounded-full shadow-lg" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-5 text-[16px] font-medium">
          {[
            { href: '/dashboard', icon: FaHome, label: 'Dashboard' },
            { href: '/dashboard/create-event', icon: FaCalendarAlt, label: 'Create Event' },
            { href: '/dashboard/events', icon: FaListAlt, label: 'Event List' },
            { href: '/dashboard/guest-list', icon: FaUsers, label: 'Guest List' },
            { href: '/dashboard/my-tickets', icon: FaTicketAlt, label: 'My Tickets' },
            { href: '/dashboard/rsvp-tracker', icon: FaClipboardList, label: 'RSVP Tracker' },
            { href: '/dashboard/settings', icon: FaCog, label: 'Settings' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-white/10 hover:translate-x-1 transition-all duration-200 ease-in-out hover:shadow-lg hover:text-white/90"
            >
              <Icon size={18} className="min-w-[20px]" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-tl from-[#f4f5f7] via-[#e4e7eb] to-[#ccd0d5] p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 transition duration-300">
          {children}
        </div>
      </main>
    </div>
  );
}
