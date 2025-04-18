// src/app/layout.js

import './globals.css';

export const metadata = {
  title: 'VibeHive – Manage and Discover Events',
  description: 'Create, manage, and explore events with Eventify.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <main className="min-h-screen flex flex-col">
          {children}
          <footer className="mt-auto px-6 py-8 border-t border-gray-200 text-center text-sm text-gray-600 bg-white shadow-inner">
            © {new Date().getFullYear()} <span className="font-semibold">VibeHive</span>. All rights reserved.
          </footer>
        </main>
      </body>
    </html>
  );
}
