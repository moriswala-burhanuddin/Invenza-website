import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!agreed) return;
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      navigate('/checkout-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] py-12 px-4 sm:px-6 lg:px-8 font-['Inter'] flex justify-center">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit'] tracking-tight">
            Complete Your Subscription
          </h2>
          <p className="mt-4 text-lg text-[#64748B] dark:text-[#94A3B8]">
            You're one step away from the ultimate ERP experience.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl shadow-xl border border-[#E2E8F0] dark:border-[#1E293B] overflow-hidden">
          <div className="p-8 border-b border-[#E2E8F0] dark:border-[#1E293B]">
            <h3 className="text-xl font-bold text-[#1E3A8A] dark:text-[#3B82F6] mb-6">Order Summary</h3>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-2xl font-bold text-[#0F172A] dark:text-white">Invenza ERP Enterprise</div>
                <div className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">Annual Subscription</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">£500</div>
                <div className="text-sm text-[#64748B] dark:text-[#94A3B8] font-medium">per year</div>
              </div>
            </div>

            {/* Structure exactly as user requested */}
            <div className="bg-[#EFF6FF] dark:bg-[#1E293B]/50 rounded-xl p-6 space-y-4">
              <h4 className="font-bold text-[#1E40AF] dark:text-[#60A5FA]">Annual Commitment</h4>
              <p className="text-sm text-[#475569] dark:text-[#CBD5E1]">
                Your Invenza ERP subscription is billed annually at £500. By completing the purchase, you agree to a 12-month subscription term.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#BFDBFE] dark:border-[#334155]">
                <div>
                  <h5 className="font-semibold text-[#1E3A8A] dark:text-[#93C5FD] text-sm">Cancellation</h5>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                    Cancel anytime to prevent renewal. Access remains active until the end of the current billing period.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-[#1E3A8A] dark:text-[#93C5FD] text-sm">Refunds</h5>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                    Annual subscription fees are non-refundable. Cancelling during an active term does not entitle you to a prorated refund.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Action Section */}
          <div className="p-8 bg-[#F8FAFC] dark:bg-[#020617]/50">
            
            <div className="mb-8">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <div className="w-6 h-6 rounded border-2 border-[#CBD5E1] dark:border-[#475569] peer-checked:bg-[#2563EB] peer-checked:border-[#2563EB] transition-colors flex items-center justify-center">
                    <svg className={`w-4 h-4 text-white pointer-events-none ${agreed ? 'opacity-100' : 'opacity-0'} transition-opacity`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <div className="text-sm text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  I agree to the Invenza ERP{' '}
                  <Link to="/terms" className="text-[#2563EB] hover:underline font-medium">Terms & Conditions</Link>,{' '}
                  <Link to="/cancellation-policy" className="text-[#2563EB] hover:underline font-medium">Cancellation & Refund Policy</Link>, and{' '}
                  <Link to="/privacy-policy" className="text-[#2563EB] hover:underline font-medium">Privacy Policy</Link>.
                </div>
              </label>
            </div>

            <div className="text-center mb-6">
              <div className="text-2xl font-black text-[#0F172A] dark:text-white font-['Outfit'] mb-2">
                £500 / year
              </div>
              <div className="text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center justify-center gap-2 flex-wrap max-w-lg mx-auto">
                <span>12-month commitment</span>
                <span>•</span>
                <span>Renews annually</span>
                <span>•</span>
                <span>Cancel anytime to stop future renewal</span>
                <span>•</span>
                <span>No refund for the current annual term</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={!agreed || isProcessing}
              className={`w-full py-5 rounded-2xl font-bold text-lg font-['Outfit'] transition-all ${agreed ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xl shadow-blue-500/25 cursor-pointer transform hover:scale-[1.02]' : 'bg-[#E2E8F0] dark:bg-[#334155] text-[#94A3B8] cursor-not-allowed'}`}
            >
              {isProcessing ? 'Processing Payment...' : 'Start Annual Subscription — £500'}
            </button>
            
            <p className="text-center text-xs text-[#94A3B8] mt-6">
              Secured by Stripe. By clicking the button above, you confirm that you have read and agreed to our policies.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
