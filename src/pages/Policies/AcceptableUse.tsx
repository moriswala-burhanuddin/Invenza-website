import { Link } from 'react-router-dom';

export default function AcceptableUse() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-8 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Acceptable Use Policy
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Permitted Use</h2>
          <p>
            Invenza ERP is intended for legitimate business operations. You agree to use the service only for 
            lawful purposes and in accordance with all applicable local and international regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Prohibited Activities</h2>
          <p>
            You may not use the platform to store illegal materials, distribute malware, conduct fraudulent 
            activities, or attempt to reverse-engineer, disrupt, or hack the Invenza infrastructure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Violation of Terms</h2>
          <p>
            Invenza reserves the right to immediately suspend or terminate accounts found to be in violation 
            of this Acceptable Use Policy, without a refund.
          </p>
        </section>
      </div>
    </div>
  );
}
