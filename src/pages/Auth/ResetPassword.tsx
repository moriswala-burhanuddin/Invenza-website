import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid || !token) {
      setError('Invalid password reset link.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/reset-password/', { 
        uid, 
        token, 
        password 
      });
      setMessage(res.data.message || 'Password reset successful!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid or expired reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px]"
      >
        <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight mb-3">Create New Password</h1>
          <p className="text-[#86868B] text-[17px]">Choose a new password for your account.</p>
        </div>

        {message ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-[16px] text-center border border-green-100">
            {message}
            <p className="text-sm mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <input
                type="password"
                placeholder="New Password"
                required
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-transparent rounded-[16px] text-[17px] text-[#1D1D1F] placeholder:text-[#86868B] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-transparent rounded-[16px] text-[17px] text-[#1D1D1F] placeholder:text-[#86868B] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0077ED] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
