'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import InputField from '../../components/InputField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Wait for hydration
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }
  
      // Save token and user info to localStorage
      localStorage.setItem('token', data.token);         // <-- JWT stored here
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user.userId); 
  
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto mt-20 px-8 py-12 rounded-3xl shadow-2xl bg-gradient-to-r from-[#1d464a] to-[#14282a] text-white"
    >
      <h2 className="text-4xl font-extrabold text-center mb-6 tracking-tight">Welcome Back</h2>
      <p className="text-center text-sm text-teal-100 mb-8">Login to access your dashboard</p>

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
          label="Email Address"
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
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
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-teal-100">
        Don’t have an account?{' '}
        <a href="/register" className="font-medium text-teal-300 hover:underline">
          Register here
        </a>
      </p>

      <div className="mt-8 space-y-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          Continue with Google
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl text-white font-semibold bg-blue-800 hover:bg-blue-900 shadow-lg"
        >
          Continue with Facebook
        </motion.button>
      </div>
    </motion.div>
  );
}
