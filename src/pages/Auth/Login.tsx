import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/login/`, {
        email,
        password
      });
      
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid email or password');
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
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-3">Welcome Back</h1>
          <p className="text-[#86868B] text-[17px]">Sign in to your Invenza ERP portal.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-5 py-4 bg-[#F5F5F7] dark:bg-[#111115] border border-transparent dark:border-gray-800/50 rounded-[16px] text-[17px] text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#1a1a20] focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-5 py-4 bg-[#F5F5F7] dark:bg-[#111115] border border-transparent dark:border-gray-800/50 rounded-[16px] text-[17px] text-[#1D1D1F] dark:text-white placeholder:text-[#86868B] dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#1a1a20] focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

          <div className="text-right pb-2">
            <Link to="/forgot-password" className="text-[#0071E3] hover:text-[#0077ED] text-[15px] font-medium transition-colors">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0077ED] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-[#86868B] text-[15px]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#0071E3] font-medium hover:underline">
            Start Free Trial
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
