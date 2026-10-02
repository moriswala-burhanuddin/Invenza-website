import { Link } from 'react-router-dom';

export default function SLA() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-10 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Service Level Agreement (SLA)
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <p>
            This Service Level Agreement ("SLA") is part of the agreement between Invenza ("Company", "we", "us") and you ("Customer", "you") for the use of the Invenza ERP platform. This SLA describes the service levels, availability commitments, and remedies applicable to the Service.
          </p>
        </section>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Uptime Commitment</h2>
          <p>
            Invenza commits to a target uptime of <strong>99.5%</strong> per calendar month for the core ERP platform, measured as the total available minutes minus any downtime, divided by total minutes in the month.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#0F172A]">
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Monthly Uptime %</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Maximum Allowed Downtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                <tr><td className="px-4 py-3">99.5%</td><td className="px-4 py-3">~3.6 hours/month</td></tr>
                <tr><td className="px-4 py-3">99.0%</td><td className="px-4 py-3">~7.3 hours/month</td></tr>
                <tr><td className="px-4 py-3">95.0%</td><td className="px-4 py-3">~36 hours/month</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Exclusions from Downtime Calculation</h2>
          <p>The following events are excluded from the uptime calculation:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Scheduled Maintenance:</strong> Planned maintenance windows communicated at least 48 hours in advance via email or dashboard notification. Scheduled maintenance will typically occur during low-traffic periods (Sundays 02:00–06:00 UTC).</li>
            <li><strong>Force Majeure Events:</strong> Natural disasters, acts of war, government actions, pandemic, cyber-attacks beyond our reasonable control.</li>
            <li><strong>Third-Party Failures:</strong> Outages caused by third-party services (e.g., Stripe, cloud hosting providers) outside our direct control.</li>
            <li><strong>Customer-Caused Issues:</strong> Issues caused by your own infrastructure, network, or misuse of the Service.</li>
            <li><strong>Emergency Security Patches:</strong> Unscheduled maintenance required to address critical security vulnerabilities.</li>
          </ul>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Service Credits (Remedies)</h2>
          <p>
            If Invenza fails to meet the 99.5% monthly uptime target, you may be eligible for a service credit:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#0F172A]">
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Monthly Uptime</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Service Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                <tr><td className="px-4 py-3">99.0% – 99.49%</td><td className="px-4 py-3">5% of monthly subscription cost</td></tr>
                <tr><td className="px-4 py-3">95.0% – 98.99%</td><td className="px-4 py-3">10% of monthly subscription cost</td></tr>
                <tr><td className="px-4 py-3">Below 95.0%</td><td className="px-4 py-3">25% of monthly subscription cost</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            <strong>Note:</strong> Service credits are calculated based on the prorated monthly cost of your annual subscription (e.g., £500/12 = ~£41.67/month). The maximum service credit in any single month shall not exceed 25% of the monthly prorated subscription cost.
          </p>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. How to Claim a Service Credit</h2>
          <p>
            To request a service credit, you must submit a written claim to <strong>support@invenza.co.uk</strong> within 30 days of the end of the month in which the downtime occurred. Your claim must include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your account email and company name.</li>
            <li>The dates and times of the downtime incidents.</li>
            <li>A description of how the downtime affected your use of the Service.</li>
          </ul>
          <p>
            Service credits will be applied to your next renewal invoice. Service credits are not transferable, may not be converted to cash, and shall not exceed the total annual subscription fee.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">5. Support Response Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#0F172A]">
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Severity</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Description</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Initial Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                <tr><td className="px-4 py-3 font-semibold text-red-600 dark:text-red-400">Critical</td><td className="px-4 py-3">Service completely unavailable</td><td className="px-4 py-3">Within 4 hours</td></tr>
                <tr><td className="px-4 py-3 font-semibold text-yellow-600 dark:text-yellow-400">High</td><td className="px-4 py-3">Major feature impaired</td><td className="px-4 py-3">Within 12 hours</td></tr>
                <tr><td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">Medium</td><td className="px-4 py-3">Minor feature issue or workaround available</td><td className="px-4 py-3">Within 24 hours</td></tr>
                <tr><td className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Low</td><td className="px-4 py-3">General enquiry or feature request</td><td className="px-4 py-3">Within 48 hours</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">6. Data Backup</h2>
          <p>
            Invenza performs daily automated backups of all customer data. Backups are encrypted and retained for a minimum of 30 days. In the event of data loss, Invenza will use commercially reasonable efforts to restore the most recent backup. Invenza is not liable for data loss that cannot be recovered from our backup systems.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-8">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">Contact Us</h2>
          <p>
            For SLA-related enquiries or service credit claims, contact <strong>support@invenza.co.uk</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
