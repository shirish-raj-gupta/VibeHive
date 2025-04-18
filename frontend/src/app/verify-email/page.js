'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const id = query.get('id');

    if (!token || !id) {
      setError('Invalid verification link.');
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/verify-email?token=${token}&id=${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'An error occurred while verifying your email.');
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.success) {
          setSuccess(true);
          setTimeout(() => router.push('/login'), 3000); // Delay redirect for better user experience
        } else {
          setError('Email verification failed. Please try again.');
        }
      } catch (err) {
        console.error('Error verifying email:', err);
        setError('An error occurred while verifying your email.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [router]);

  if (loading) {
    return <p className="text-center text-teal-100">Verifying your email...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-20 px-8 py-12 rounded-3xl shadow-2xl bg-gradient-to-r from-[#1d464a] to-[#14282a] text-white">
      <h2 className="text-4xl font-extrabold text-center mb-6 tracking-tight">Email Verification</h2>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : success ? (
        <p className="text-center text-teal-100">Your email has been successfully verified! Redirecting to login...</p>
      ) : null}
    </div>
  );
}
