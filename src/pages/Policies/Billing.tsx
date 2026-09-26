import { Link } from 'react-router-dom';

export default function Billing() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-8 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Subscription & Billing Policy
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Annual Billing Cycle</h2>
          <p>
            Invenza ERP is a premium Software-as-a-Service (SaaS) product billed on an annual basis. The standard 
            subscription fee is £500 per year, billed entirely upfront at the commencement of your 12-month term.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Automatic Renewals</h2>
          <p>
            To ensure uninterrupted service, your subscription is set to automatically renew at the end of each 
            12-month billing cycle. The renewal charge will be billed to the default payment method on file 
            at the then-current standard annual rate.
          </p>
          <p>
            You will receive an email notification prior to your renewal date. You may disable automatic renewal 
            at any time by navigating to <strong>Settings &gt; Billing &gt; Cancel Renewal</strong> in your dashboard.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Failed Payments</h2>
          <p>
            If a renewal payment fails, Invenza reserves the right to suspend access to your account after a 
            grace period of 7 days. We will attempt to contact you and automatically retry the payment method 
            during this grace period. 
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. Taxes and Duties</h2>
          <p>
            All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities, unless stated 
            otherwise. You shall be responsible for payment of all such taxes, levies, or duties.
          </p>
        </section>
      </div>
    </div>
  );
}
