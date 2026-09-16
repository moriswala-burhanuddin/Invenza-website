import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

interface PlanData {
  id: number;
  name: string;
  monthly_price: string;
  annual_price: string | null;
  annual_price_calculated: string;
  billing_interval: string;
  description: string;
  is_active: boolean;
  trial_period_days: number;
  stripe_price_id: string | null;
}

interface GroupedPlan {
  name: string;
  monthlyPlan: PlanData;
  annualPlan?: PlanData;
  features: string[];
}

const ERP_FEATURES = [
  { category: 'Core ERP', name: 'Unlimited Users & Roles', included: true },
  { category: 'Core ERP', name: 'Advanced Dashboard & Analytics', included: true },
  { category: 'Inventory', name: 'Multi-warehouse Management', included: true },
  { category: 'Inventory', name: 'Real-time Stock Tracking', included: true },
  { category: 'Sales', name: 'Custom Invoicing & Billing', included: true },
  { category: 'Sales', name: 'Stripe Autopay Integration', included: true },
  { category: 'Support', name: '24/7 Priority Support', included: true },
  { category: 'Support', name: 'Dedicated Account Manager', included: true },
];

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPlanName, setCurrentPlanName] = useState<string | null>(null);
  const [currentBillingInterval, setCurrentBillingInterval] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // We always want to fetch plans. If creds fail with 401, that's fine (user is logged out)
    api.get('/billing/plans/')
      .then(plansRes => {
        setPlans(plansRes.data);
        return Promise.all([
          api.get('/erp-credentials/').catch(() => null),
          api.get('/billing/subscription-status/').catch(() => null)
        ]);
      })
      .then(([credsRes, subRes]) => {
        if (credsRes?.data?.subscription_status === 'active') {
          setCurrentPlanName(credsRes.data.plan_name);
        }
        if (subRes?.data?.subscription) {
          setCurrentBillingInterval(subRes.data.subscription.billing_interval);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load pricing plans.');
        setLoading(false);
      });
  }, []);

  const singleGroup: GroupedPlan | null = (() => {
    if (plans.length === 0) return null;
    const plan = plans[0]; // Take the first active plan as the single unified plan
    return {
      name: plan.name,
      monthlyPlan: plan,
      features: plan.description
        ? plan.description.split('.').filter((f: string) => f.trim().length > 0).map((f: string) => f.trim())
        : [],
    };
  })();

  const handleSubscribe = async () => {
    if (!singleGroup) return;
    
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login?redirect=/pricing');
      return;
    }

    const activePlan = singleGroup.monthlyPlan;
    setLoadingPlan(singleGroup.name);
    setError(null);
    try {
      const response = await api.post('/billing/create-checkout-session/', {
        plan_id: activePlan.id,
        billing_interval: 'year',
      });
      window.location.href = response.data.checkout_url;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to start checkout. Please try again.');
      setLoadingPlan(null);
    }
  };

  const getDisplayPrice = (): string => {
    if (!singleGroup) return '0.00';
    const annualPrice = parseFloat(
      singleGroup.annualPlan?.annual_price || 
      singleGroup.annualPlan?.annual_price_calculated || 
      singleGroup.monthlyPlan.annual_price || 
      '500'
    );
    return annualPrice.toFixed(2);
  };

  const isCurrentPlan = (): boolean => {
    if (!singleGroup) return false;
    // If they have any active plan, they are on this single plan platform
    return currentPlanName !== null && currentBillingInterval === 'year';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isCurrent = isCurrentPlan();

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-[40px] md:text-[56px] font-semibold text-[#1D1D1F] dark:text-white tracking-tight mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-[20px] text-[#86868B] max-w-2xl mx-auto mb-8">
            One comprehensive plan. Everything you need to scale your business.
          </p>
        </motion.div>

        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Single Plan Card */}
        {singleGroup && (
          <div className="flex justify-center max-w-md mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white dark:bg-[#1D1D1F] shadow-2xl border-2 border-[#0071E3] shadow-[0_0_60px_rgba(0,113,227,0.15)] rounded-[28px] p-8 flex flex-col relative overflow-hidden"
            >
              {/* Plan Icon & Name */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 w-fit mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold text-sm">Unified Enterprise</span>
              </div>

              <p className="text-[#86868B] text-sm mb-6 h-10 leading-relaxed">
                Full access to all Invenza ERP features. No hidden limits.
              </p>

              {/* Price Display */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-[#86868B] text-lg">£</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={singleGroup.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-5xl font-bold text-[#1D1D1F] dark:text-white tracking-tight"
                    >
                      {getDisplayPrice()}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[#86868B] ml-1">/year</span>
                </div>
              </div>

              {/* Subscribe Button (Hidden if already subscribed) */}
              {!isCurrent ? (
                <button
                  onClick={handleSubscribe}
                  disabled={loadingPlan === singleGroup.name}
                  className={`w-full py-3.5 rounded-full font-medium transition-all ${
                    loadingPlan === singleGroup.name
                      ? 'bg-blue-400 text-white cursor-not-allowed'
                      : 'bg-[#0071E3] text-white hover:bg-[#0077ED] hover:shadow-lg active:scale-95'
                  }`}
                >
                  {loadingPlan === singleGroup.name
                    ? 'Processing...'
                    : 'Subscribe Now'}
                </button>
              ) : (
                <div className="w-full py-3.5 rounded-full font-medium text-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                  ✓ Actively Subscribed
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Features Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-[#1D1D1F] rounded-[28px] border border-black/5 dark:border-white/10 overflow-hidden shadow-sm"
        >
          <div className="px-8 py-6 border-b border-black/5 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
            <h3 className="text-xl font-semibold text-[#1D1D1F] dark:text-white">Included Features</h3>
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {ERP_FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-center justify-between px-8 py-4 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#1D1D1F] dark:text-white">{feature.name}</p>
                  <p className="text-xs text-[#86868B] mt-0.5">{feature.category}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#0071E3]">
                  <Check className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Current Plan Info */}
        {currentPlanName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-5 py-3 rounded-2xl text-sm font-medium border border-blue-200 dark:border-blue-800/50">
              <Check className="w-5 h-5" />
              You are currently subscribed and have full access to all features.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
