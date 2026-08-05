import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/request-password-reset/', { email });
      setMessage(res.data.message || 'Check your email for a reset link.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030308] flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px]"
      >
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#86868B] dark:text-gray-400 hover:text-[#1D1D1F] dark:hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-3">Reset Password</h1>
          <p className="text-[#86868B] text-[17px]">Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {message ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-[16px] text-center border border-green-100">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-4 bg-[#F5F5F7] dark:bg-[#111115] border border-transparent dark:border-gray-800/50 rounded-[16px] text-[17px] text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#1a1a20] focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0077ED] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
