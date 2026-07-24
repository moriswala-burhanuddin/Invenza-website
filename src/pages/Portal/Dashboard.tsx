import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Building2, Calendar, CreditCard, Lock, User, AlertCircle, Loader2, Info, Activity, Download, MonitorPlay, History, Clock, Laptop2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0071E3] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-32 pb-20">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0071E3]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0071E3]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight mb-2">Portal Dashboard</h1>
              <p className="text-[#86868B] text-[17px]">Manage your Invenza ERP subscription and credentials.</p>
            </div>
            {/* Optional: Add a subtle status indicator or greeting here */}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {data && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* MAIN CONTENT (Left Column) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Analytics Section - Prominent */}
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#0071E3]/10 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 text-[#0071E3]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1D1D1F]">Activity & Analytics</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Downloads */}
                    <div className="bg-[#F5F5F7] p-5 rounded-[24px]">
                      <div className="flex items-center gap-2 mb-2 text-[#86868B]">
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Downloads</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1D1D1F]">2</p>
                    </div>
                    
                    {/* Desktop Logins */}
                    <div className="bg-[#F5F5F7] p-5 rounded-[24px]">
                      <div className="flex items-center gap-2 mb-2 text-[#86868B]">
                        <MonitorPlay className="w-4 h-4" />
                        <span className="text-sm font-medium">App Logins</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1D1D1F]">14</p>
                    </div>
                    
                    {/* Last Login */}
                    <div className="bg-[#F5F5F7] p-5 rounded-[24px]">
                      <div className="flex items-center gap-2 mb-2 text-[#86868B]">
                        <History className="w-4 h-4" />
                        <span className="text-sm font-medium">Last Login</span>
                      </div>
                      <p className="text-[17px] font-semibold text-[#1D1D1F] mt-1">Today, 09:41 AM</p>
                    </div>
                    
                    {/* Trial Days */}
                    <div className="bg-[#F5F5F7] p-5 rounded-[24px]">
                      <div className="flex items-center gap-2 mb-2 text-[#86868B]">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Trial Left</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1D1D1F]">{data.trial_days !== undefined ? data.trial_days : 7} Days</p>
                    </div>
                    
                    {/* Active Device */}
                    <div className="bg-[#F5F5F7] p-5 rounded-[24px]">
                      <div className="flex items-center gap-2 mb-2 text-[#86868B]">
                        <Laptop2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Active Device</span>
                      </div>
                      <p className="text-[15px] font-semibold text-[#1D1D1F] mt-1 truncate">WINDOWS-DESKTOP</p>
                    </div>
                    
                    {/* Current Version */}
                    <div className="bg-[#F5F5F7] p-5 rounded-[24px]">
                      <div className="flex items-center gap-2 mb-2 text-[#86868B]">
                        <Info className="w-4 h-4" />
                        <span className="text-sm font-medium">Version</span>
                      </div>
                      <p className="text-[17px] font-semibold text-[#1D1D1F] mt-1">v1.0.4</p>
                    </div>
                  </div>
                </div>

                {/* ERP Credentials Card */}
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#1D1D1F]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1D1D1F]">ERP Access</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[15px] text-[#86868B] mb-4">
                      Use these credentials to log in to the desktop POS terminal and the web ERP.
                    </p>
                    <div>
                      <p className="text-sm text-[#86868B] mb-1">Login ID</p>
                      <div className="bg-[#F5F5F7] px-4 py-3 rounded-xl border border-gray-200">
                        <code className="text-[15px] text-[#1D1D1F] font-mono">{data.login_id}</code>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-[#86868B] mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" /> 
                        Admin credentials were sent to your email.
                      </p>
                      <a href="/settings" className="text-[#0071E3] hover:text-[#0077ED] text-[15px] font-medium transition-colors">
                        Manage Company Settings →
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* SIDEBAR (Right Column) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Instructions Card */}
                <div className="bg-gradient-to-br from-white to-[#F8F9FA] border border-gray-100 rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#0071E3]/10 text-[#0071E3] p-2.5 rounded-xl">
                      <Info className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#1D1D1F]">Next Steps</h4>
                  </div>
                  <ul className="space-y-4 text-[15px] text-[#86868B] leading-relaxed">
                    <li className="flex gap-2 items-start">
                      <span className="text-[#0071E3] mt-1">•</span>
                      <span><strong>Download the App:</strong> Get the Desktop application (Windows or macOS).</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-[#0071E3] mt-1">•</span>
                      <span><strong>Log In:</strong> Use your email and the temporary ERP password sent to your inbox.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-[#0071E3] mt-1">•</span>
                      <span><strong>Trial Status:</strong> Keep an eye on your 7-day trial status. We'll email you before it expires.</span>
                    </li>
                  </ul>
                  
                  <div className="flex flex-col gap-3 mt-8">
                    <a href="#" className="w-full bg-[#1D1D1F] text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-black transition-all hover:shadow-lg flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download Windows App
                    </a>
                    <a href="#" className="w-full bg-white border border-gray-200 text-[#1D1D1F] px-5 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                      Download macOS App
                    </a>
                  </div>
                </div>

                {/* Subscription Card */}
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#F5F5F7] rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[#1D1D1F]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1D1D1F]">Subscription</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-[#86868B] mb-1">Company Name</p>
                      <p className="text-[17px] font-medium text-[#1D1D1F] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#86868B]" />
                        {data.company_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#86868B] mb-1">Plan Status</p>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        {data.subscription_status.charAt(0).toUpperCase() + data.subscription_status.slice(1)}
                      </span>
                    </div>
                    {data.trial_days !== undefined && (
                      <div>
                        <p className="text-sm text-[#86868B] mb-1">Trial Remaining</p>
                        <p className="text-[17px] font-medium text-[#1D1D1F] flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#86868B]" />
                          {data.trial_days} Days
                        </p>
                      </div>
                    )}
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
