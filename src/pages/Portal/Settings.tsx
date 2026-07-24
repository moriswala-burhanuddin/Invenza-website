import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, Save, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [companyId, setCompanyId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    legal_name: '',
    tax_id: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    website: '',
    base_currency: 'UGX'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate('/login');
          return;
        }

        // 1. Get the current user's company ID from erp-credentials
        const credRes = await axios.get(`${API_URL}/erp-credentials/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const cId = credRes.data.company_id;
        
        if (cId) {
          setCompanyId(cId);
          // 2. Fetch the full company profile using that ID
          const res = await axios.get(`${API_URL}/companies/${cId}/`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const company = res.data;
          setFormData({
            name: company.name || '',
            legal_name: company.legal_name || '',
            tax_id: company.tax_id || '',
            address: company.address || '',
            city: company.city || '',
            state: company.state || '',
            pincode: company.pincode || '',
            phone: company.phone || '',
            website: company.website || '',
            base_currency: company.base_currency || 'UGX'
          });
        } else {
          setError('No company profile found.');
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to load settings.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) return;
    
    setSaving(true);
    setError('');
    setSuccess(false);
    
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`${API_URL}/companies/${companyId}/`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update settings.');
    } finally {
      setSaving(false);
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
    <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight mb-2">Company Settings</h1>
            <p className="text-[#86868B] text-[17px]">Update your business details and contact information.</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm font-medium border border-green-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Settings updated successfully.
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Company Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Legal Entity Name</label>
                  <input
                    type="text"
                    name="legal_name"
                    value={formData.legal_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Tax ID / VAT (e.g. GST/PAN)</label>
                  <input
                    type="text"
                    name="tax_id"
                    value={formData.tax_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">State / Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">ZIP / Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Website</label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none"
                  />
                </div>
              </div>
              
              <hr className="border-gray-100" />
              
              <div>
                <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">Base Currency</label>
                <select
                  name="base_currency"
                  value={formData.base_currency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F5F5F7] border border-transparent rounded-xl text-[15px] text-[#1D1D1F] focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all outline-none appearance-none"
                >
                  <option value="UGX">UGX (Ugandan Shilling)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="INR">INR (Indian Rupee)</option>
                  <option value="GBP">GBP (British Pound)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
                <p className="mt-2 text-xs text-[#86868B]">Default display currency for your ERP dashboard.</p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0071E3] text-white px-8 py-3 rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0077ED] transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
