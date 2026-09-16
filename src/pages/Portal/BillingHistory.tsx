import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Download, CreditCard, Clock, ExternalLink, XCircle, RefreshCw, Loader2 } from 'lucide-react';

interface SubscriptionData {
  status: string;
  plan_name: string | null;
  plan_id: number | null;
  monthly_price: string | null;
  billing_interval: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  auto_renew: boolean;
  is_active: boolean;
  stripe_subscription_id: string | null;
}

interface PaymentData {
  id: number;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  created_at: string;
}

interface InvoiceData {
  id: number;
  invoice_no: string;
  total: string;
  stripe_invoice_url: string | null;
  created_at: string;
}

export default function BillingHistory() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get('/billing/subscription-status/');
      setSubscription(res.data.subscription);
      setPayments(res.data.payments || []);
      setInvoices(res.data.invoices || []);
    } catch (err) {
      console.error('Failed to load billing data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const res = await api.post('/billing/customer-portal/');
      window.location.href = res.data.portal_url;
    } catch {
      alert('Failed to open billing portal. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCancel = async () => {
    setCancelLoading(true);
    try {
      await api.post('/billing/cancel-subscription/', { immediately: false });
      await fetchData();
      setShowCancelConfirm(false);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to cancel subscription');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleResume = async () => {
    setResumeLoading(true);
    try {
      await api.post('/billing/resume-subscription/');
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to resume subscription');
    } finally {
      setResumeLoading(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatCurrency = (amount: number, currency: string) => {
    const value = amount / 100;
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : currency === 'INR' ? '₹' : currency + ' ';
    return `${symbol}${value.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#0071E3] animate-spin" />
      </div>
    );
  }

  const daysUntilExpiry = subscription?.current_period_end
    ? Math.max(0, Math.ceil((new Date(subscription.current_period_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const statusColors: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    TRIAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    PAST_DUE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    GRACE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    EXPIRED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    SUSPENDED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mb-8">Billing & Subscriptions</h1>

      {/* Current Subscription Card */}
      <div className="bg-white dark:bg-[#1D1D1F] rounded-[20px] border border-black/5 dark:border-white/10 p-8 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-semibold text-[#1D1D1F] dark:text-white">
                {subscription?.plan_name || 'No Plan'}
              </h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[subscription?.status || ''] || 'bg-gray-100 text-gray-800'}`}>
                {subscription?.status}
              </span>
              {subscription?.auto_renew && subscription?.status === 'ACTIVE' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                  ⚡ Autopay Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-[#86868B] mb-1">Billing Cycle</p>
                <p className="text-sm font-medium text-[#1D1D1F] dark:text-white capitalize">
                  {subscription?.billing_interval === 'year' ? 'Annual' : 'Monthly'}
                  {subscription?.monthly_price && ` — £${subscription.monthly_price}/mo`}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#86868B] mb-1">Next Billing Date</p>
                <p className="text-sm font-medium text-[#1D1D1F] dark:text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#86868B]" />
                  {formatDate(subscription?.current_period_end || null)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#86868B] mb-1">Days Remaining</p>
                <p className="text-sm font-medium text-[#1D1D1F] dark:text-white">{daysUntilExpiry} days</p>
              </div>
            </div>

            {subscription?.cancel_at_period_end && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-xl">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  ⚠️ Your subscription will cancel on {formatDate(subscription.current_period_end)}. Your data will be preserved.
                </p>
                <button
                  onClick={handleResume}
                  disabled={resumeLoading}
                  className="mt-2 text-sm font-medium text-[#0071E3] hover:text-[#0077ED] inline-flex items-center gap-1"
                >
                  {resumeLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                  Resume Subscription
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 min-w-[180px]">
            {subscription?.stripe_subscription_id && (
              <button
                onClick={handleManageBilling}
                disabled={portalLoading}
                className="px-5 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2"
              >
                {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                Manage Billing
              </button>
            )}
            {subscription?.is_active && !subscription?.cancel_at_period_end && subscription?.stripe_subscription_id && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="px-5 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1D1D1F] rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-semibold text-[#1D1D1F] dark:text-white mb-3">Cancel Subscription?</h3>
            <p className="text-[#5F6368] dark:text-[#A1A1A6] text-sm mb-2">
              Your subscription will remain active until <strong>{formatDate(subscription?.current_period_end || null)}</strong>.
              After that, you won't be charged again.
            </p>
            <p className="text-[#5F6368] dark:text-[#A1A1A6] text-sm mb-6">
              💡 Your data is safe — you can resubscribe at any time.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-[#E8E8ED] dark:bg-[#333336] text-[#1D1D1F] dark:text-white rounded-xl font-medium"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelLoading}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium flex items-center justify-center gap-2"
              >
                {cancelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Table */}
      <div className="bg-white dark:bg-[#1D1D1F] rounded-[20px] border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 dark:border-white/10">
          <h2 className="text-lg font-medium text-[#1D1D1F] dark:text-white">Payment History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F7] dark:bg-[#2C2C2E] text-sm text-[#5F6368] dark:text-[#A1A1A6]">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Invoice</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {invoices.map((invoice, idx) => {
                const payment = payments[idx];
                return (
                  <tr key={invoice.id} className="border-b border-black/5 dark:border-white/10 last:border-0 hover:bg-[#F5F5F7]/50 dark:hover:bg-[#2C2C2E]/50">
                    <td className="px-6 py-4 text-[#1D1D1F] dark:text-[#D2D2D7]">
                      {new Date(invoice.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4 text-[#1D1D1F] dark:text-[#D2D2D7] font-medium">
                      {invoice.invoice_no}
                    </td>
                    <td className="px-6 py-4 text-[#1D1D1F] dark:text-[#D2D2D7]">
                      £{invoice.total}
                    </td>
                    <td className="px-6 py-4 text-[#5F6368] dark:text-[#A1A1A6]">
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" />
                        {payment?.payment_method === 'stripe' ? 'Stripe' : payment?.payment_method || 'Card'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {invoice.stripe_invoice_url ? (
                        <a
                          href={invoice.stripe_invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0071E3] hover:text-[#0077ED] inline-flex items-center transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1.5" />
                          View
                        </a>
                      ) : (
                        <button className="text-[#0071E3] hover:text-[#0077ED] inline-flex items-center transition-colors">
                          <Download className="w-4 h-4 mr-1.5" />
                          PDF
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {invoices.length === 0 && (
          <div className="p-12 text-center text-[#86868B]">
            <CreditCard className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p>No payment history found.</p>
            <p className="text-sm mt-1">Payments will appear here once you subscribe.</p>
          </div>
        )}
      </div>
    </div>
  );
}
