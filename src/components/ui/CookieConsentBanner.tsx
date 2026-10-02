import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'invenza_cookie_consent';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show banner if user hasn't already consented or declined
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't appear instantly on page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: false,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 transition-all duration-500"
      style={{
        animation: 'slideUp 0.5s ease-out forwards',
      }}
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          
          {/* Cookie Icon + Text */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl" role="img" aria-label="cookie">🍪</span>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-white">We use cookies</h3>
            </div>
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              We use strictly necessary cookies to keep you logged in and remember your preferences. 
              We do not use tracking or advertising cookies.{' '}
              <Link to="/cookie-policy" className="text-[#2563EB] hover:underline font-medium">
                Read our Cookie Policy
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-[#475569] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#334155] hover:bg-[#E2E8F0] dark:hover:bg-[#475569] rounded-xl transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
