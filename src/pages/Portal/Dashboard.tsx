import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Building2, Calendar, CreditCard, Lock, User, AlertCircle, Loader2, Info, Activity, Download, MonitorPlay, History, Clock, Laptop2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [downloadingPlatform, setDownloadingPlatform] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get(`${API_URL}/erp-credentials/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data) {
          setData(res.data);
        } else {
          setError('No company found associated with this account.');
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to load dashboard data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleDownload = async (platform: string) => {
    try {
      setDownloadingPlatform(platform);
      // Since the repo is public, we can fetch directly from GitHub API!
      const res = await axios.get('https://api.github.com/repos/moriswala-burhanuddin/Invenza-Electron-app/releases/latest');
      const assets = res.data.assets || [];
      let url = null;
      const ext = platform === 'windows' ? '.exe' : '.dmg';
      
      for (const asset of assets) {
        if (asset.name.endsWith(ext)) {
          url = asset.browser_download_url;
          break;
        }
      }
      
      if (url) {
        window.location.href = url;
      } else {
        alert(`No ${ext} file found in the latest release.`);
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to fetch the latest download link from GitHub.');
    } finally {
      setDownloadingPlatform(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0071E3] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0071E3]/10 dark:bg-[#0071E3]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0071E3]/5 dark:bg-[#0071E3]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-2">Portal Dashboard</h1>
              <p className="text-[#86868B] dark:text-gray-400 text-[17px]">Manage your Invenza ERP subscription and credentials.</p>
            </div>
            {/* Optional: Add a subtle status indicator or greeting here */}
          </div>

          {/* Banner removed in favor of dedicated PaymentSuccess page */}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {data && (
            <div className="max-w-5xl">
              
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Overview</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your ERP installation and usage.</p>
              </div>

              {/* App Downloads & Trial */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <button 
                  onClick={() => handleDownload('windows')}
                  disabled={downloadingPlatform === 'windows'}
                  className="text-left bg-white dark:bg-[#0A0A0A] p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#0071E3] dark:hover:border-[#0071E3] transition-colors group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {downloadingPlatform === 'windows' ? (
                      <Loader2 className="w-4 h-4 text-[#0071E3] animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#0071E3] transition-colors" />
                    )}
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-[#0071E3] transition-colors">Download for Windows</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#0071E3] transition-colors">Invenza ERP (.exe)</p>
                </button>
                
                <button 
                  onClick={() => handleDownload('mac')}
                  disabled={downloadingPlatform === 'mac'}
                  className="text-left bg-white dark:bg-[#0A0A0A] p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#0071E3] dark:hover:border-[#0071E3] transition-colors group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {downloadingPlatform === 'mac' ? (
                      <Loader2 className="w-4 h-4 text-[#0071E3] animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#0071E3] transition-colors" />
                    )}
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-[#0071E3] transition-colors">Download for Mac</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#0071E3] transition-colors">Invenza ERP (Universal)</p>
                </button>
                
                <div className="bg-white dark:bg-[#0A0A0A] p-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {data.subscription_status === 'trial' && data.trial_days !== undefined 
                      ? `${data.trial_days} Days Remaining` 
                      : data.subscription_status.charAt(0).toUpperCase() + data.subscription_status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* ERP Credentials Card */}
                <div className="bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-gray-200 dark:border-white/10">
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-400" /> ERP Access
                    </h3>
                  </div>
                  <div className="p-5 flex-1 flex flex-col gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Login ID</p>
                      <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-200 dark:border-white/5">
                        <code className="text-[14px] text-gray-900 dark:text-white font-mono">{data.login_id}</code>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Copy</button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" /> Password
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your ERP password is the same as your portal password.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10">
                    <a href="/settings" className="text-sm font-medium text-[#0071E3] dark:text-[#47bfff] hover:underline">
                      Manage Security Settings →
                    </a>
                  </div>
                </div>

                {/* Subscription Card */}
                <div className="bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-gray-200 dark:border-white/10">
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" /> Subscription Plan
                    </h3>
                  </div>
                  <div className="p-5 flex-1 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Current Plan</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{data.plan_name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {data.subscription_status.charAt(0).toUpperCase() + data.subscription_status.slice(1)}
                      </span>
                    </div>
                    {(data.subscription_status === 'active' && data.expiry_date) ? (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Next Billing</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(data.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10 flex gap-3">
                    <button 
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem('access_token');
                          const res = await fetch(`${API_URL}/billing/customer-portal/`, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          });
                          const json = await res.json();
                          if (json.portal_url) window.location.href = json.portal_url;
                        } catch { navigate('/billing-history'); }
                      }}
                      className="flex-1 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm"
                    >
                      Manage Billing
                    </button>
                    <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
