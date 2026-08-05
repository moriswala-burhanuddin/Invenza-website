import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from 'react-razorpay';
import { Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api'; // Assuming you have an api axios instance

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { Razorpay } = useRazorpay();
  const navigate = useNavigate();

  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dedicated Success State
  const [successData, setSuccessData] = useState<{
    planName: string;
    amount: number;
    orderId: string;
  } | null>(null);

  const [currentPlanName, setCurrentPlanName] = useState<string | null>(null);

  useEffect(() => {
    // Fetch both plans and current user's credentials to get their active plan
    Promise.all([
      api.get('/billing/plans/'),
      api.get('/erp-credentials/')
    ])
      .then(([plansRes, credsRes]) => {
        setPlans(plansRes.data);
        if (credsRes.data && credsRes.data.subscription_status === 'active') {
          setCurrentPlanName(credsRes.data.plan_name);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load pricing plans.');
        setLoading(false);
      });
  }, []);

  const handleSubscribe = async (planId: number) => {
    setLoadingPlan(planId);
    setError(null);
    try {
      // 1. Create order on backend
      const orderResponse = await api.post('/billing/create-order/', { plan_id: planId });
      const { order_id, amount, currency, key } = orderResponse.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: 'Invenza ERP',
        description: 'Subscription Payment',
        order_id: order_id,
        handler: async (response: any) => {
          try {
            // 3. Verify payment on backend
            await api.post('/billing/verify-payment/', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            // 4. Success! Show dedicated success screen instead of redirecting immediately
            const selectedPlan = plans.find(p => p.id === planId);
            setSuccessData({
              planName: selectedPlan?.name || 'Invenza ERP Plan',
              amount: amount / 100, // Razorpay amount is in paise/cents
              orderId: order_id
            });
          } catch (verifyError) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Invenza Customer',
        },
        theme: {
          color: '#0071E3',
        },
      };

      const rzpay = new Razorpay(options);
      
      rzpay.on('payment.failed', function (response: any) {
        setError('Payment failed. Reason: ' + response.error.description);
      });

      rzpay.open();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to initiate payment. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  if (successData) {
    return (
      <div className="fixed inset-0 z-[100] bg-white dark:bg-[#030308] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 dark:bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-lg w-full mx-auto px-6 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
          >
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" strokeWidth={3} />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-4">Payment Successful!</h2>
          <p className="text-[#86868B] dark:text-gray-400 text-lg mb-10 leading-relaxed">
            Thank you for subscribing to the <strong className="text-[#1D1D1F] dark:text-white">{successData.planName}</strong> plan. We've sent a detailed tax invoice to your registered email address.
          </p>

          <div className="bg-[#F5F5F7] dark:bg-white/5 rounded-3xl p-8 mb-10 text-left border border-gray-100 dark:border-gray-800/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#86868B] dark:text-gray-400 text-sm font-medium">Order ID</span>
              <span className="text-[#1D1D1F] dark:text-white font-mono text-sm">{successData.orderId}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200 dark:border-gray-800/50">
              <span className="text-[#86868B] dark:text-gray-400 text-sm font-medium">Amount Paid</span>
              <span className="text-[#1D1D1F] dark:text-white font-semibold">${successData.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800/50">
              <span className="text-[#86868B] dark:text-gray-400 text-sm font-medium">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Active
              </span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[40px] md:text-[56px] font-semibold text-[#1D1D1F] dark:text-white tracking-tight mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-[20px] text-[#86868B] max-w-2xl mx-auto mb-6">
            Choose the plan that best fits your business needs. Upgrade or downgrade at any time.
          </p>
          {currentPlanName && (
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl text-sm font-medium border border-blue-200 dark:border-blue-800/50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Note: Changing your plan will immediately start a new 30-day billing cycle. Any remaining days on your current plan will be sacrificed.
            </div>
          )}
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-[24px] p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-white dark:bg-[#1D1D1F] shadow-2xl border-2 border-[#0071E3] relative transform md:-translate-y-4'
                  : 'bg-white/60 dark:bg-[#1D1D1F]/60 border border-black/5 dark:border-white/10'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0071E3] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mb-2">{plan.name}</h3>
              <p className="text-[#86868B] text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-[#1D1D1F] dark:text-white">₹{plan.monthly_price}</span>
                <span className="text-[#86868B] ml-2">per month</span>
              </div>
              
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loadingPlan === plan.id || plan.name === currentPlanName}
                className={`w-full py-3 rounded-full font-medium transition-all mb-8 ${
                  plan.name === currentPlanName 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-not-allowed opacity-100 border border-green-200 dark:border-green-800'
                    : plan.name === 'Gold' || plan.name === 'Professional'
                    ? 'bg-[#0071E3] text-white hover:bg-[#0077ED]'
                    : 'bg-[#E8E8ED] dark:bg-[#333336] text-[#1D1D1F] dark:text-white hover:bg-[#D2D2D7] dark:hover:bg-[#424245]'
                } disabled:opacity-50`}
              >
                {plan.name === currentPlanName ? 'Current Plan' : loadingPlan === plan.id ? 'Processing...' : 'Subscribe Now'}
              </button>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1D1D1F] dark:text-white mb-4">What's included:</p>
                <ul className="space-y-3">
                  {plan.description && plan.description.split('.').filter((f: string) => f.trim().length > 0).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-[#0071E3] mr-3 shrink-0" />
                      <span className="text-sm text-[#5F6368] dark:text-[#A1A1A6]">{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

