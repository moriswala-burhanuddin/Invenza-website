import { Link } from 'react-router-dom';

export default function Cancellation() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-8 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Cancellation & Refund Policy
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Annual Subscription Commitment</h2>
          <p>
            Invenza ERP operates strictly on a 12-month annual subscription model billed at £500 per year. 
            By subscribing to Invenza ERP, you agree to a full 12-month commitment. We do not offer monthly 
            billing or partial-year subscriptions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Canceling Your Renewal</h2>
          <p>
            You may cancel your subscription renewal at any time through your Invenza ERP Dashboard by clicking 
            <strong> "Cancel Renewal"</strong>. 
          </p>
          <p>
            <strong>Important:</strong> Canceling your renewal does not immediately terminate your current access, 
            nor does it constitute a refund request. It simply prevents your payment method from being charged 
            for the following 12-month term.
          </p>
          <p>
            If you cancel your renewal, your access to Invenza ERP will remain fully active until the end of 
            your current paid annual billing period. Once that period ends, your account will be downgraded or suspended.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. No Prorated Refunds</h2>
          <p>
            <strong>Annual subscription fees are strictly non-refundable once activated.</strong>
          </p>
          <p>
            Because you are purchasing an annual license at a discounted upfront rate, we do not issue prorated 
            refunds for the unused portion of your term. For example, if you pay for your subscription on 
            October 1, 2026, and decide to cancel your renewal on January 15, 2027, you will not receive a refund 
            for the period between January and September. Your access will simply continue until September 30, 2027.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. Exceptional Circumstances</h2>
          <p>
            Refunds will only be considered in exceptional circumstances, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Where required by applicable consumer protection law.</li>
            <li>In the event of continuous, prolonged, and documented service outages that violate our Service Level Agreement.</li>
            <li>If a duplicate charge was made in error by our payment processor (Stripe).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">5. Contact Us</h2>
          <p>
            If you believe you have been charged in error or have questions regarding your billing cycle, 
            please contact our billing department at billing@invenza.com before initiating any chargebacks.
          </p>
        </section>

      </div>
    </div>
  );
}
