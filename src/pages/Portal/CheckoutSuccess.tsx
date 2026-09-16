import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, Loader2, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const MAX_RETRIES = 8;
const RETRY_DELAY_MS = 3000;

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [data, setData] = useState<{
    status: string;
    plan_name: string;
    next_billing_date: string | null;
    billing_interval: string;
  } | null>(null);

  const verifyCheckout = useCallback(async (attempt: number) => {
    if (!sessionId) {
      setError('Invalid checkout session. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/billing/checkout-success/?session_id=${sessionId}`);
      const result = response.data;

      if (result.status === 'active') {
        // Success!
        setData(result);
        setLoading(false);
        setError(null);
      } else if (result.status === 'pending') {
        // Still processing — retry if we haven't exceeded max retries
        if (attempt < MAX_RETRIES) {
          setRetryCount(attempt + 1);
          setTimeout(() => verifyCheckout(attempt + 1), RETRY_DELAY_MS);
        } else {
          // Give up after max retries
          setError('Payment verification is taking longer than expected. Your payment was received — please check your dashboard in a few minutes.');
          setLoading(false);
        }
      } else {
        // Unexpected status
        setData(result);
        setLoading(false);
      }
    } catch (err: any) {
      const serverError = err.response?.data?.error;
      const statusCode = err.response?.status;

      // On 500 errors, retry (the backend might still be processing)
      if (statusCode === 500 && attempt < MAX_RETRIES) {
        setRetryCount(attempt + 1);
        setTimeout(() => verifyCheckout(attempt + 1), RETRY_DELAY_MS);
        return;
      }

      setError(serverError || 'Failed to verify your payment. Please contact support.');
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    verifyCheckout(0);
  }, [verifyCheckout]);

  // Manual retry handler
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount(0);
    verifyCheckout(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#1D1D1F] p-12 rounded-[28px] shadow-2xl border border-black/5 dark:border-white/10 flex flex-col items-center gap-6 max-w-sm w-full text-center"
        >
          <Loader2 className="w-12 h-12 text-[#0071E3] animate-spin" />
          <div>
            <h3 className="text-xl font-semibold text-[#1D1D1F] dark:text-white mb-2">Processing Payment</h3>
            <p className="text-[#86868B] text-sm leading-relaxed">
              {retryCount > 0
                ? `Confirming your payment... (attempt ${retryCount + 1}/${MAX_RETRIES})`
                : 'Securely finalizing your subscription...'}
            </p>
          </div>
          {retryCount > 2 && (
            <p className="text-xs text-[#86868B] mt-4 bg-gray-50 dark:bg-black/20 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
              This is taking a bit longer than usual. Please don't close this page.
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1D1D1F] p-10 md:p-12 rounded-[32px] shadow-2xl border border-red-100 dark:border-red-900/30 max-w-lg w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
          <div className="w-20 h-20 mx-auto bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-8">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-4">Something went wrong</h2>
          <p className="text-[#86868B] text-lg mb-10 leading-relaxed">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="flex-1 inline-flex items-center justify-center gap-2 py-4 bg-[#0071E3] text-white rounded-full font-medium transition-all hover:bg-[#0077ED] active:scale-95"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-4 bg-[#F5F5F7] dark:bg-[#333336] text-[#1D1D1F] dark:text-white rounded-full font-medium transition-all hover:bg-[#E8E8ED] dark:hover:bg-[#444447] active:scale-95"
            >
              Go to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] py-20 px-6 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white dark:bg-[#1D1D1F] shadow-2xl shadow-blue-900/5 rounded-[40px] border border-black/5 dark:border-white/10 overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Column: Success Message */}
          <div className="flex-1 p-10 md:p-12 flex flex-col justify-center bg-[#FAFAFC] dark:bg-[#151516] border-b md:border-b-0 md:border-r border-black/5 dark:border-white/10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
              className="w-16 h-16 bg-[#0071E3] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30"
            >
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </motion.div>
            <h1 className="text-4xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-4 leading-tight">
              Payment<br />Successful
            </h1>
            <p className="text-[#86868B] text-lg leading-relaxed mb-10">
              Welcome to Invenza ERP. An email receipt has been sent to your inbox.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg active:scale-95 w-fit"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Column: Receipt Details */}
          <div className="flex-1 p-10 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#0071E3]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1D1D1F] dark:text-white">Subscription Details</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-[#86868B] mb-1">Plan</p>
                <p className="text-lg font-semibold text-[#1D1D1F] dark:text-white">{data?.plan_name}</p>
              </div>
              
              <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />
              
              <div>
                <p className="text-sm font-medium text-[#86868B] mb-1">Billing Interval</p>
                <p className="text-lg font-medium text-[#1D1D1F] dark:text-white capitalize">
                  {data?.billing_interval === 'year' ? 'Annually' : 'Monthly'}
                </p>
              </div>

              <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />

              <div>
                <p className="text-sm font-medium text-[#86868B] mb-1">Next Billing Date</p>
                <p className="text-lg font-medium text-[#1D1D1F] dark:text-white">
                  {formatDate(data?.next_billing_date || null)}
                </p>
              </div>

              <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#86868B]">Status</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
