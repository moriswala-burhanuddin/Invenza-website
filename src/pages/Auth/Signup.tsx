import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/signup/`, formData);
      setSuccess(true);
    } catch (err: any) {
      if (err.response?.data) {
        const errors = err.response.data;
        const firstError = Object.values(errors)[0];
        if (Array.isArray(firstError)) {
          setError(firstError[0]);
        } else if (typeof firstError === 'string') {
          setError(firstError);
        } else {
          setError('Signup failed. Please try again.');
        }
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#030308] flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px] text-center"
        >
          <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mb-4">You're all set!</h2>
          <p className="text-[#86868B] text-[17px] mb-10 leading-relaxed">
            Your account has been created successfully. We've sent a verification link to your email address. You will be able to set up your company and get your ERP credentials after verifying.
          </p>
          <Link
            to="/login"
            className="w-full py-4 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold flex items-center justify-center hover:bg-[#0077ED] transition-colors"
          >
            Continue to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#030308] flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px]"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-3">Create Account</h1>
          <p className="text-[#86868B] text-[17px]">Start your 7-day free trial of Invenza ERP.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              required
              className="w-full px-5 py-4 bg-[#F5F5F7] dark:bg-[#111115] border border-transparent dark:border-gray-800/50 rounded-[16px] text-[17px] text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#1a1a20] focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-5 py-4 bg-[#F5F5F7] dark:bg-[#111115] border border-transparent dark:border-gray-800/50 rounded-[16px] text-[17px] text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#1a1a20] focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
              value={formData.email}
              onChange={handleChange}
            />
            
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              required
              minLength={8}
              className="w-full px-5 py-4 bg-[#F5F5F7] dark:bg-[#111115] border border-transparent dark:border-gray-800/50 rounded-[16px] text-[17px] text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#1a1a20] focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0077ED] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Free Trial'}
          </button>
        </form>

        <p className="text-center mt-8 text-[#86868B] text-[15px]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#0071E3] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
