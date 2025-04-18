'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import InputField from '../../components/InputField';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setError('Please fill in all the fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fakeRegisterApi(name, email, phone, password);

      if (response.success) {
        router.push('/login');
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('An error occurred while registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fakeRegisterApi = (name, email, phone, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email !== 'user@example.com') {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Email already registered' });
        }
      }, 1000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto mt-20 px-8 py-12 rounded-3xl shadow-2xl bg-gradient-to-r from-[#1d464a] to-[#14282a] text-white"
    >
      <h2 className="text-4xl font-extrabold text-center mb-6 tracking-tight">Join VibeHive</h2>
      <p className="text-center text-sm text-teal-100 mb-8">Create an account to get started</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm bg-red-100 text-red-600 px-4 py-3 rounded-lg shadow-sm"
          >
            {error}
          </motion.div>
        )}

        <InputField
          label="Full Name"
          type="text"
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="Email Address"
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

<InputField
  label="Phone Number"
  type="tel"
  id="phone"
  placeholder="+1 234 567 8901"
  pattern="^\+?[0-9\s\-]{7,15}$"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  required
/>


        <InputField
          label="Password"
          type="password"
          id="password"
          placeholder="Create a secure password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

<motion.button
  whileTap={{ scale: 0.97 }}
  type="submit"
  className={`w-full py-3 rounded-xl font-semibold text-lg transition duration-300 ease-in-out ${
    loading
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-white text-[#1d464a] hover:bg-gray-100 shadow-md'
  }`}
  disabled={loading}
>
  {loading ? 'Registering...' : 'Register'}
</motion.button>

      </form>

      <p className="mt-6 text-center text-sm text-teal-100">
        Already have an account?{' '}
        <a href="/login" className="font-medium text-teal-300 hover:underline">
          Login here
        </a>
      </p>
    </motion.div>
  );
}
