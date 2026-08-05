import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/verify-email/', { token });
        
        // Save tokens to log the user in automatically
        if (res.data.access && res.data.refresh) {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
        }
        
        setStatus('success');
        setMessage(res.data.message || 'Email verified successfully!');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Failed to verify email. The link may have expired.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030308] flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] text-center"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-[#0071E3] animate-spin" />
            <h1 className="text-2xl font-bold text-[#1D1D1F] dark:text-white">Verifying...</h1>
            <p className="text-[#86868B] dark:text-gray-400">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h1 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">Email Verified!</h1>
            <p className="text-[#86868B] dark:text-gray-400">{message}</p>
            <p className="text-[#86868B] dark:text-gray-400 text-sm mt-2">Next, you'll need to set up your company to start your trial.</p>
            <button
              onClick={() => navigate('/setup-company')}
              className="w-full py-4 mt-6 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold hover:bg-[#0077ED] transition-colors"
            >
              Complete Setup
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500" />
            <h1 className="text-3xl font-bold text-[#1D1D1F] dark:text-white">Verification Failed</h1>
            <p className="text-[#86868B] dark:text-gray-400">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 mt-6 bg-[#1D1D1F] dark:bg-white text-white dark:text-black rounded-full text-[17px] font-semibold hover:bg-black dark:hover:bg-gray-200 transition-colors"
            >
              Return to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
