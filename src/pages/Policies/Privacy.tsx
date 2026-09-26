import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-8 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Privacy Policy
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Information We Collect</h2>
          <p>
            When you register for Invenza ERP, we collect your business name, contact information, and billing details. 
            When you use the software, we securely store the data you input (inventory, CRM, financials) strictly for 
            the purpose of providing the service to you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Data Security</h2>
          <p>
            We implement industry-standard encryption and security measures to protect your business data. We do not 
            sell, rent, or trade your data to any third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Third-Party Processors</h2>
          <p>
            We use trusted third-party processors like Stripe for billing. They are bound by strict data privacy 
            agreements and only process the data necessary to complete your transactions.
          </p>
        </section>
      </div>
    </div>
  );
}
