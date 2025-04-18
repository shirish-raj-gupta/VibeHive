'use client';

import { useState } from 'react';
import { FaBell, FaMoon, FaSun } from 'react-icons/fa';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.classList.toggle('dark', e.target.value === 'dark');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-[#1D464A] mb-6">Settings</h2>

      <div className="space-y-6">
        {/* Notifications Section */}
        <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50">
          <div className="flex items-center gap-4">
            <FaBell className="text-[#1D464A] text-2xl" />
            <span className="text-lg font-medium">Email Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only"
            />
            <span className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700"></span>
            <span
              className={`absolute left-1 top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                notifications ? 'transform translate-x-5' : ''
              }`}
            ></span>
          </label>
        </div>

        {/* Theme Selector Section */}
        <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50">
          <div className="flex items-center gap-4">
            {theme === 'light' ? (
              <FaSun className="text-yellow-500 text-2xl" />
            ) : (
              <FaMoon className="text-gray-600 text-2xl" />
            )}
            <span className="text-lg font-medium">Theme</span>
          </div>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="border rounded px-4 py-2 bg-gray-50 text-[#1D464A] dark:bg-gray-800 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
}
