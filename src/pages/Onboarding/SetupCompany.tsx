import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Copy, Info } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function SetupCompany() {
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [erpPassword, setErpPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You must be logged in to set up a company.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/setup-company/`,
        { company_name: companyName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setErpPassword(res.data.temp_erp_pass);
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
          setError('Setup failed. Please try again.');
        }
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(erpPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[500px] text-center"
        >
          <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-[#1D1D1F] mb-4">Setup Complete!</h2>
          <p className="text-[#86868B] text-[17px] mb-8 leading-relaxed">
            Your 7-day trial has started. Below is your <strong>Admin Password</strong> for the Desktop ERP app.
          </p>

          <div className="bg-[#F5F5F7] p-6 rounded-2xl mb-8 border border-red-100 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              IMPORTANT: Save this password!
            </div>
            <p className="text-sm text-[#86868B] mb-3">
              This password is securely hashed in our database. We cannot recover it if you lose it. It will not be shown again.
            </p>
            <div className="flex items-center justify-between bg-white border border-[#E5E5EA] p-4 rounded-xl">
              <span className="font-mono text-lg font-medium text-[#1D1D1F]">{erpPassword}</span>
              <button 
                onClick={copyToClipboard}
                className="text-[#0071E3] hover:text-[#0077ED] transition-colors flex items-center gap-2 font-medium"
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate('/portal')}
            className="w-full py-4 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold flex items-center justify-center hover:bg-[#0077ED] transition-colors"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px]"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight mb-3">Set Up Your Company</h1>
          <p className="text-[#86868B] text-[17px]">Complete this final step to unlock your portal.</p>
        </div>

        <div className="bg-[#F5F5F7] rounded-[16px] p-5 mb-8 flex items-start gap-4">
          <div className="bg-[#0071E3]/10 text-[#0071E3] p-2 rounded-full mt-1 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[17px] font-semibold text-[#1D1D1F] mb-1">How it works</h4>
            <p className="text-[15px] text-[#86868B] leading-relaxed">
              Once you set up your company, your <strong>7-day free trial</strong> will automatically begin. 
              We will generate your portal and provide you with credentials to access the Invenza ERP app.
            </p>
          </div>
        </div>

        <form onSubmit={handleSetup} className="space-y-4">
          <div className="space-y-4">
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              required
              className="w-full px-5 py-4 bg-[#F5F5F7] border border-transparent rounded-[16px] text-[17px] text-[#1D1D1F] placeholder:text-[#86868B] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 bg-[#0071E3] text-white rounded-full text-[17px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0077ED] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Setup'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
