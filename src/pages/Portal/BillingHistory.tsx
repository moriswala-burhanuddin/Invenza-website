import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Download, CreditCard, AlertCircle, Clock } from 'lucide-react';

export default function BillingHistory() {
  const [subscription, setSubscription] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you'd have an endpoint like /billing/history/
    // that returns current subscription details and past invoices.
    // We are putting dummy data here assuming the endpoint will be built.
    setSubscription({
      status: 'ACTIVE',
      plan: 'Professional',
      expiresAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    setInvoices([
      {
        id: 1,
        invoiceNo: 'INV-2026-00014',
        date: new Date().toISOString(),
        amount: 59.00,
        status: 'Paid',
        method: 'Card ending in 4242'
      }
    ]);
    
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-8">Loading billing data...</div>;
  }

  const daysUntilExpiry = subscription?.expiresAt 
    ? Math.max(0, Math.ceil((new Date(subscription.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mb-8">Billing & Subscriptions</h1>
      
      {/* Current Subscription Card */}
      <div className="bg-white dark:bg-[#1D1D1F] rounded-[16px] border border-black/5 dark:border-white/10 p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-[#1D1D1F] dark:text-white mb-1">Current Plan: {subscription?.plan}</h2>
            <div className="flex items-center text-sm mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mr-4">
                {subscription?.status}
              </span>
              <span className="flex items-center text-[#5F6368] dark:text-[#A1A1A6]">
                <Clock className="w-4 h-4 mr-1.5" />
                Expires in {daysUntilExpiry} days
              </span>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="px-6 py-2.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-lg font-medium transition-colors">
              Renew Now
            </button>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-white dark:bg-[#1D1D1F] rounded-[16px] border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-black/5 dark:border-white/10 last:border-0 hover:bg-[#F5F5F7]/50 dark:hover:bg-[#2C2C2E]/50">
                  <td className="px-6 py-4 text-[#1D1D1F] dark:text-[#D2D2D7]">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-[#1D1D1F] dark:text-[#D2D2D7] font-medium">
                    {invoice.invoiceNo}
                  </td>
                  <td className="px-6 py-4 text-[#1D1D1F] dark:text-[#D2D2D7]">
                    
                  </td>
                  <td className="px-6 py-4 text-[#5F6368] dark:text-[#A1A1A6] flex items-center mt-3">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {invoice.method}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#0071E3] hover:text-[#0077ED] inline-flex items-center transition-colors">
                      <Download className="w-4 h-4 mr-1.5" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {invoices.length === 0 && (
          <div className="p-8 text-center text-[#86868B]">
            No payment history found.
          </div>
        )}
      </div>
    </div>
  );
}

