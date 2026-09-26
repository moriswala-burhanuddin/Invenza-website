import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-8 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Terms & Conditions
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Agreement to Terms</h2>
          <p>
            By accessing or using Invenza ERP, you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Enterprise License</h2>
          <p>
            Subject to your compliance with these Terms and your payment of the £500 annual subscription fee, 
            Invenza grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access 
            and use the ERP software for your internal business operations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Data Ownership</h2>
          <p>
            You retain all right, title, and interest in and to your data. Invenza claims no ownership over 
            the financial, inventory, or customer data you process through our systems.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. Limitation of Liability</h2>
          <p>
            In no event shall Invenza, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential or punitive damages, including without 
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your 
            access to or use of or inability to access or use the Service.
          </p>
        </section>
      </div>
    </div>
  );
}
